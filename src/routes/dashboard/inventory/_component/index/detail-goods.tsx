import {
  Ellipsis,
  PackageCheck,
  PackageMinus,
  PackageOpen,
  PackagePlus,
} from 'lucide-react'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { atom, useAtom } from 'jotai'
import { format } from 'date-fns'

import {
  useDetailGoods,
  useGoodsTransaction,
  useUpdateGoods,
} from '@/hooks/api/use-goods'
import usePermission from '@/hooks/use-permission'
import { useApiData } from '@/hooks/use-api-data'

import { formatToRupiah } from '@/utils/formatCurrency'
import { BASE_URL } from '@/utils/constant/_urls'
import { createGoods } from '@/utils/types/form'
import { Transaction } from '@/utils/types/api'

import PhotoProfile from '@/components/common/photo-profile'
import SelectV1 from '@/components/common/select/select-v1'
import EmptyState from '@/components/common/empty-state'
import DataSheet from '@/components/common/data-sheet'
import { EditorDescription } from '@/components/tiptap/editor-description'
import { Sheet, SheetContent, SheetTitle } from '@/components/ui/sheet'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Editable } from '@/components/common/editable'
import { CommandItem } from '@/components/ui/command'
import { Button } from '@/components/ui/button'
import { Tab, Tabs } from '@/components/tab'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { useInventoryData } from '../../_hook/use-inventory-data'
import ProtectedComponent from '@/components/protected'

export const selectedGoodAtom = atom<{
  open: boolean
  id: number | null
} | null>(null)

export default function DetailGoods() {
  const permission = usePermission()

  const [selected, setSelected] = useAtom(selectedGoodAtom)

  const { mutate: update } = useUpdateGoods()

  const [content, setContent] = useState('')

  const { measurementOptions, categoryOptions, locationOptions, brands } =
    useInventoryData()

  const { data, isLoading } = useDetailGoods({
    id: selected?.id,
    enabled: selected?.open || false,
  })
  const good = useMemo(() => data?.data.data, [data, isLoading])

  const { data: transactions } = useApiData(
    useGoodsTransaction({ enabled: selected?.open || false, id: selected?.id })
  )

  const [edit, setEdit] = useState<string | null>('')
  const isEdit = useMemo(() => edit, [edit])
  const onEdit = useCallback(
    (val: string | null) => {
      setEdit(val)
    },
    [edit]
  )

  const onClose = () => {
    setSelected(null)
  }

  const handleUpdate = (payload: Partial<createGoods>) => {
    if (!selected?.id) return
    update({ id: selected.id, payload })
    setEdit(null)
  }

  useEffect(() => {
    if (!selected?.open) {
      onEdit(null)
    }
  }, [selected?.open])

  const isAllowed = permission.includes('item:update')

  return (
    <Sheet open={selected?.open} onOpenChange={() => onClose()} modal={false}>
      <SheetContent className='w-full p-0 bg-[#FBFBFB]'>
        <SheetTitle>
          <div className='h-12 w-full flex gap-2 items-center border-b border-line px-4 bg-white'>
            <p className='text-sm text-dark font-normal'>Detail Barang</p>
          </div>
        </SheetTitle>
        <ScrollArea className='h-[calc(100vh-48px)]'>
          <div className='pt-4 px-4 pb-8 bg-white'>
            <PhotoProfile
              defaultPreview={
                good?.photoUrl ? BASE_URL + '/img/' + good?.photoUrl : null
              }
              onUpdate={(photo) => {
                handleUpdate({ photo })
              }}
              onRemove={() => {
                handleUpdate({ photoUrl: null })
              }}
              disabled={!isAllowed}
            />
            <div className='relative pr-7'>
              <Editable
                isEdit={isEdit}
                keyData='name'
                onEdit={onEdit}
                defaultData={good?.name}
                className='text-lg font-medium text-dark mt-4 py-1 px-1'
                classNameInput='text-lg font-medium text-dark mt-4 py-1 px-1'
                onUpdate={(name) => handleUpdate({ name: String(name) })}
                disabled={!isAllowed}
              />
              <ProtectedComponent required={['supplier:delete']}>
                <DropdownMenu modal={false}>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant='outline'
                      className='absolute flex justify-center items-center top-1/2 -translate-y-1/2 right-0 w-6 h-6 p-0'
                    >
                      <Ellipsis size={14} />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className='min-w-fit -translate-x-4'>
                    <DropdownMenuGroup>
                      <DropdownMenuItem>Hapus</DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </ProtectedComponent>
            </div>
            <Editable
              isEdit={isEdit}
              onEdit={onEdit}
              keyData='description'
              classNameInput='w-full'
              defaultData={good?.description}
              type='custom'
              customEdit={
                <div>
                  <EditorDescription
                    content={good?.description || content}
                    onChange={setContent}
                  />
                  <div className='flex justify-end gap-2 mt-2'>
                    <Button variant='secondary' onClick={() => onEdit(null)}>
                      Batal
                    </Button>
                    <Button
                      variant='default'
                      onClick={() => {
                        if (!selected?.id) return

                        update(
                          {
                            id: selected.id,
                            payload: { description: content },
                          },
                          { onSuccess: () => onEdit(null) }
                        )
                      }}
                    >
                      Simpan
                    </Button>
                  </div>
                </div>
              }
              customData={(val) => (
                <div className='px-6 border rounded border-line w-full'>
                  <div
                    className='w-full py-2'
                    dangerouslySetInnerHTML={{ __html: val }}
                  />
                </div>
              )}
              className='text-dark/50'
              disabled={!isAllowed}
            />

            <div className='space-y-4 mt-4'>
              <DataSheet>
                <p className='text-dark/50'>Kuantitas</p>
                <p className='text-dark'>{good?.qty}</p>
              </DataSheet>
              <DataSheet>
                <p className='text-dark/50'>Tersedia</p>
                <p className='text-dark'>{good?.available}</p>
              </DataSheet>
            </div>
          </div>

          <Tabs className='bg-white'>
            <Tab label='Umum'>
              <div className='flex flex-col gap-4 w-fit p-4 pb-8'>
                <DataSheet>
                  <p className='text-dark/50'>Stok Minimum</p>
                  <Editable
                    isEdit={isEdit}
                    onEdit={onEdit}
                    keyData='minimum'
                    defaultData={good?.minimum}
                    customData={(val) => <p>{val}</p>}
                    onUpdate={(val) => handleUpdate({ minimum: Number(val) })}
                    disabled={!isAllowed}
                  />
                </DataSheet>
                <DataSheet>
                  <p className='text-dark/50'>Ukuran</p>
                  <Editable
                    isEdit={isEdit}
                    onEdit={onEdit}
                    keyData='measurement'
                    defaultData={good?.measurement?.name}
                    type='select'
                    options={measurementOptions}
                    onUpdate={(val) =>
                      handleUpdate({ measurementId: Number(val) })
                    }
                    disabled={!isAllowed}
                  />
                </DataSheet>
                <DataSheet>
                  <p className='text-dark/50'>Kategori</p>
                  <Editable
                    isEdit={isEdit}
                    onEdit={onEdit}
                    keyData='category'
                    defaultData={good?.category?.name}
                    type='select'
                    options={categoryOptions}
                    onUpdate={(val) =>
                      handleUpdate({ categoryId: Number(val) })
                    }
                    disabled={!isAllowed}
                  />
                </DataSheet>
                <DataSheet>
                  <p className='text-dark/50'>Lokasi</p>
                  <Editable
                    isEdit={isEdit}
                    onEdit={onEdit}
                    keyData='location'
                    defaultData={good?.location?.name}
                    type='select'
                    options={locationOptions}
                    onUpdate={(val) =>
                      handleUpdate({ locationId: Number(val) })
                    }
                    disabled={!isAllowed}
                  />
                </DataSheet>
                <DataSheet>
                  <p className='text-dark/50'>Merek</p>
                  <Editable
                    isEdit={isEdit}
                    onEdit={onEdit}
                    keyData='brand'
                    defaultData={good?.brand?.name}
                    type='custom'
                    customEdit={
                      <div className='flex gap-2 items-center'>
                        <SelectV1
                          modal={false}
                          useFormMode={false}
                          name='brandId'
                          className='gap-2 w-full'
                          side='bottom'
                          preview={(val) => {
                            const selectedBrands = brands?.find(
                              (item) => item.id === Number(val)
                            )
                            return <span>{selectedBrands?.name || ''}</span>
                          }}
                          contentStyle='w-48'
                        >
                          {brands?.map((item) => (
                            <CommandItem
                              key={item.id}
                              className='hover:bg-red-400'
                              value={String(item.id)}
                              onSelect={(val: string) => {
                                handleUpdate({ brandId: Number(val) })
                              }}
                            >
                              <div className='px-2 py-0.5 flex gap-1 items-center'>
                                {item.photoUrl && (
                                  <img
                                    src={BASE_URL + '/img/' + item.photoUrl}
                                    className='w-8 h-8 rounded-md object-center'
                                  />
                                )}
                                {item.name}
                              </div>
                            </CommandItem>
                          ))}
                        </SelectV1>
                        <Button variant='ghost' onClick={() => onEdit(null)}>
                          Batal
                        </Button>
                      </div>
                    }
                    onUpdate={(val) =>
                      handleUpdate({ locationId: Number(val) })
                    }
                    disabled={!isAllowed}
                  />
                </DataSheet>
              </div>
            </Tab>
            <Tab label='Laporan'>
              <div className='flex flex-col gap-6 p-4 pb-8'>
                {!!transactions && transactions?.length ? (
                  transactions?.map((item) => (
                    <TransactionsData
                      key={'transaction-' + item.id}
                      {...item}
                    />
                  ))
                ) : (
                  <EmptyState />
                )}
              </div>
            </Tab>
          </Tabs>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}

export function TransactionsData({
  date,
  good,
  type,
  qty,
  supplier,
  price,
  project,
}: Transaction) {
  if (type === 'borrowed') {
    return (
      <div className='flex gap-2 items-start'>
        <div className='w-[40px] flex-shrink-0'>
          <div className='w-10 h-10 rounded-full border border-dark/30 flex items-center justify-center'>
            <PackageOpen size={18} className='text-purple-400' />
          </div>
        </div>
        <div className='flex-grow flex flex-col justify-center'>
          <p className='text-dark/70'>
            <span className='text-dark font-medium'>
              {qty} {good.measurement?.name} {good.name}
            </span>{' '}
            dipinjam {project && 'untuk proyek '}
            <span className='text-dark font-medium'>{project?.name}</span>
          </p>
          <p className='text-dark/80 mt-0.5'>{format(date, 'dd MMM yyyy')}</p>
        </div>
      </div>
    )
  }

  if (type === 'opname') {
    return (
      <div className='flex gap-2 items-start'>
        <div className='w-[40px] flex-shrink-0'>
          <div className='w-10 h-10 rounded-full border border-dark/30 flex items-center justify-center'>
            <PackageCheck size={18} className='text-green-primary' />
          </div>
        </div>
        <div className='flex-grow flex flex-col justify-center'>
          <p className='text-dark/70'>
            Berhasil menyesuaikan stock{' '}
            <span className='text-dark font-medium'>{good.name}</span> menjadi{' '}
            <span className='text-dark font-medium'>
              {qty} {good.measurement?.name}
            </span>
          </p>
          <p className='text-dark/80 mt-0.5'>{format(date, 'dd MMM yyyy')}</p>
        </div>
      </div>
    )
  }

  if (type === 'out') {
    return (
      <div className='flex gap-2 items-start'>
        <div className='w-[40px] flex-shrink-0'>
          <div className='w-10 h-10 rounded-full border border-dark/30 flex items-center justify-center'>
            <PackageMinus size={18} className='text-red-primary' />
          </div>
        </div>
        <div className='flex-grow flex flex-col justify-center'>
          <p className='text-dark/70'>
            Stok berkurang:{' '}
            <span className='text-dark font-medium'>
              {qty} {good.measurement?.name} {good.name}
            </span>
            {price && (
              <>
                {' '}
                dengan harga{' '}
                <span className='text-dark font-medium'>
                  {formatToRupiah(Number(price))}
                </span>
              </>
            )}
          </p>
          <p className='text-dark/80 mt-0.5'>{format(date, 'dd MMM yyyy')}</p>
        </div>
      </div>
    )
  }

  return (
    <div className='flex gap-2 items-start'>
      <div className='w-[40px] flex-shrink-0'>
        <div className='w-10 h-10 rounded-full border border-dark/30 flex items-center justify-center'>
          <PackagePlus size={18} className='text-blue-primary' />
        </div>
      </div>
      <div className='flex-grow flex flex-col justify-center'>
        <p className='text-dark/70'>
          Stok bertambah:{' '}
          <span className='text-dark font-medium'>
            {qty} {good.measurement?.name} {good.name}
          </span>{' '}
          <span className='text-dark font-medium'>
            {good.location?.name ? `ke ${good.location?.name}` : ''}
          </span>{' '}
          <span className='text-dark font-medium'>
            {supplier?.name ? `dari ${supplier?.name}` : ''}
          </span>{' '}
          dengan harga{' '}
          <span className='text-dark font-medium'>
            {formatToRupiah(Number(price))}
          </span>
        </p>
        <p className='text-dark/80 mt-0.5'>{format(date, 'dd MMM yyyy')}</p>
      </div>
    </div>
  )
}

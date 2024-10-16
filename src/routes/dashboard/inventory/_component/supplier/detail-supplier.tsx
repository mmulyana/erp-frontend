import { Editable } from '@/components/common/editable'
import PhotoProfile from '@/components/common/photo-profile'
import { Tab, Tabs } from '@/components/tab'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
} from '@/components/ui/sheet'
import { useDetailSupplier, useUpdateSupplier } from '@/hooks/api/use-supplier'
import { useFixPointerEvent } from '@/hooks/use-fix-pointer-events'
import { BASE_URL } from '@/utils/constant/_urls'
import { useCallback, useMemo, useState } from 'react'

type Props = {
  open: boolean
  setOpen: (val: boolean) => void
  id: number | null
}
export default function DetailSupplier({ open, setOpen, id }: Props) {
  const { data, isLoading } = useDetailSupplier(id)
  const { mutate: update } = useUpdateSupplier()

  const supplier = useMemo(() => data?.data.data || {}, [data, isLoading])

  const [edit, setEdit] = useState<string | null>('')
  const isEdit = useMemo(() => edit, [edit])
  const onEdit = useCallback(
    (val: string | null) => {
      setEdit(val)
    },
    [edit]
  )

  useFixPointerEvent(open)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent className='max-w-[512px] p-0'>
        <SheetTitle>
          <div className='h-12 w-full flex gap-2 items-center border-b border-line px-4'>
            <p className='text-sm text-dark font-normal'>Detail Supplier</p>
          </div>
        </SheetTitle>
        <SheetDescription></SheetDescription>
        <ScrollArea className='h-[calc(100vh-48px)]'>
          <div className='mt-4 px-4 mb-8'>
            <PhotoProfile
              defaultPreview={
                supplier?.photoUrl
                  ? BASE_URL + '/img/' + supplier?.photoUrl
                  : null
              }
            />
            <Editable
              isEdit={isEdit}
              keyData='name'
              onEdit={onEdit}
              defaultData={supplier?.name}
              className='text-lg font-medium text-dark mt-4 py-1 px-1'
              classNameInput='text-lg font-medium text-dark mt-4 py-1 px-1'
              onUpdate={(val) => {
                if (!id) return
                update({ id: id, payload: { name: val as string } })
              }}
            />
            <div className='flex flex-col gap-3 w-fit mt-4'>
              <div className='flex gap-2 items-center'>
                <div className='w-[140px] flex-shrink-0'>
                  <p className='text-dark/50 text-sm'>No. Telp</p>
                </div>
                <div className='flex-grow'>
                  <Editable
                    isEdit={isEdit}
                    keyData='phone'
                    onEdit={onEdit}
                    defaultData={supplier?.phone}
                    className='text-dark'
                    onUpdate={(val) => {
                      if (!id) return
                      update({ id: id, payload: { phone: val as string } })
                    }}
                  />
                </div>
              </div>
              <div className='flex gap-2 items-center'>
                <div className='w-[140px] flex-shrink-0'>
                  <p className='text-dark/50 text-sm'>Email</p>
                </div>
                <div className='flex-grow'>
                  <Editable
                    isEdit={isEdit}
                    onEdit={onEdit}
                    keyData='email'
                    defaultData={supplier?.email}
                    className='text-dark'
                    onUpdate={(val) => {
                      if (!id) return
                      update({ id: id, payload: { email: val as string } })
                    }}
                  />
                </div>
              </div>
              <div className='flex gap-2 items-center'>
                <div className='w-[140px] flex-shrink-0'>
                  <p className='text-dark/50 text-sm'>Alamat</p>
                </div>
                <div className='flex-grow'>
                  <Editable
                    isEdit={isEdit}
                    onEdit={onEdit}
                    keyData='address'
                    defaultData={supplier?.address}
                    className='text-dark'
                    onUpdate={(val) => {
                      if (!id) return
                      update({ id: id, payload: { address: val as string } })
                    }}
                  />
                </div>
              </div>
              <div className='flex gap-2 items-center'>
                <div className='w-[140px] flex-shrink-0'>
                  <p className='text-dark/50 text-sm'>Tag</p>
                </div>
                <div className='flex-grow'></div>
              </div>
            </div>
          </div>
          <Tabs>
            <Tab label='Pegawai'>
              <div className='p-4'></div>
            </Tab>
            <Tab label='Transaksi'>
              <div className='p-4'></div>
            </Tab>
          </Tabs>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}

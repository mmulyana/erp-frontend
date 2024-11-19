import { useCallback, useEffect, useMemo, useState } from 'react'
import { PackagePlus } from 'lucide-react'
import { format } from 'date-fns'

import { useFixPointerEvent } from '@/hooks/use-fix-pointer-events'
import usePermission from '@/hooks/use-permission'
import { useApiData } from '@/hooks/use-api-data'
import {
  useSupplierTransaction,
  useDetailSupplier,
  useUpdateSupplier,
} from '@/hooks/api/use-supplier'

import { formatToRupiah } from '@/utils/formatCurrency'
import { BASE_URL } from '@/utils/constant/_urls'
import { Transaction } from '@/utils/types/api'
import { cn } from '@/utils/cn'

import { Sheet, SheetContent, SheetTitle } from '@/components/ui/sheet'
import PhotoProfile from '@/components/common/photo-profile'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Editable } from '@/components/common/editable'
import { Tab, Tabs } from '@/components/tab'

import EmployeeSupplier from './employee-supplier'
import LabelSupplier from './label-supplier'
import EmptyState from '@/components/common/empty-state'

type Props = {
  open: boolean
  setOpen: (val: boolean) => void
  id?: number | null
}
export default function DetailSupplier({ open, setOpen, id }: Props) {
  const permission = usePermission()

  const { mutate: update } = useUpdateSupplier()

  const { data: supplier } = useApiData(useDetailSupplier(id))
  const { data: transactions } = useApiData(useSupplierTransaction(id))

  const [edit, setEdit] = useState<string | null>('')
  const isEdit = useMemo(() => edit, [edit])
  const onEdit = useCallback(
    (val: string | null) => {
      setEdit(val)
    },
    [edit]
  )

  useEffect(() => {
    if (!open) {
      onEdit(null)
    }
  }, [open])

  useFixPointerEvent(open)

  const isAllowed = permission.includes('supplier:update')

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent className='max-w-[512px] p-0 bg-[#FBFBFB]'>
        <SheetTitle className='bg-white'>
          <div className='h-12 w-full flex gap-2 items-center border-b border-line px-4'>
            <p className='text-sm text-dark font-normal'>Detail Supplier</p>
          </div>
        </SheetTitle>
        <ScrollArea className='h-[calc(100vh-48px)]'>
          <div className='pt-4 px-4 pb-8 bg-white'>
            <PhotoProfile
              defaultPreview={
                supplier?.photoUrl
                  ? BASE_URL + '/img/' + supplier?.photoUrl
                  : null
              }
              onUpdate={(photo) => {
                if (!id) return
                update({ id, payload: { photo } })
              }}
              onRemove={() => {
                if (!id) return
                update({ id, payload: { photo: null } })
              }}
              disabled={!isAllowed}
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
                    disabled={!isAllowed}
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
                    disabled={!isAllowed}
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
                    disabled={!isAllowed}
                  />
                </div>
              </div>
              <div
                className={cn(
                  'flex gap-2',
                  !!supplier?.tags.length && 'items-start pt-2'
                )}
              >
                <div className='w-[140px] flex-shrink-0'>
                  <p className='text-dark/50 text-sm'>Tag</p>
                </div>
                <div className='flex-grow'>
                  <LabelSupplier
                    id={id}
                    data={{ tags: supplier?.tags || [] }}
                    permission={permission}
                  />
                </div>
              </div>
            </div>
          </div>
          <Tabs className='bg-white'>
            <Tab label='Pegawai'>
              <EmployeeSupplier id={id} />
            </Tab>
            <Tab label='Transaksi'>
              <div className='p-4 space-y-6'>
                {transactions && !!transactions.length ? (
                  transactions?.map((item) => (
                    <TransactionsData
                      key={'transaction-' + item.id}
                      {...item}
                    />
                  ))
                ) : (
                  <EmptyState className='mt-4' />
                )}
              </div>
            </Tab>
          </Tabs>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}

export function TransactionsData({ date, good, qty, price }: Transaction) {
  return (
    <div className='flex gap-2 items-start'>
      <div className='w-[40px] flex-shrink-0'>
        <div className='w-10 h-10 rounded-full border border-dark/30 flex items-center justify-center'>
          <PackagePlus size={18} className='text-blue-primary/70' />
        </div>
      </div>
      <div className='flex-grow flex flex-col justify-center'>
        <p className='text-dark/70'>
          <span className='text-dark font-medium'>{good.name}</span> telah
          dibeli sebanyak <span className='text-dark font-medium'>{qty} </span>
          <span className='text-dark font-medium'>
            {good?.measurement?.name}
          </span>
          <span className='text-dark font-medium'>
            {formatToRupiah(Number(price))}
          </span>
          dengan harga satuan
        </p>
        <p className='text-dark/80 mt-0.5'>{format(date, 'dd MMM yyyy')}</p>
      </div>
    </div>
  )
}

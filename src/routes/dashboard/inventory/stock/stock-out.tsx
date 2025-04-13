import { Plus, X, PackageMinus } from 'lucide-react'
import useUrlState from '@ahooksjs/use-url-state'
import { useState } from 'react'

import { PATH } from '@/utils/constant/_paths'

import {
  useCreateTransaction,
  useTransactionPagination,
} from '@/hooks/api/use-transaction'
import useTour from '@/hooks/use-tour'
import usePermission from '@/shared/hooks/use-permission'

import DetailTransaction from './_component/detail-transaction'
import DeleteTransaction from './_component/delete-transaction'
import TitlePage from '../../../../shared/component/title-page'
import { DashboardLayout } from '../../../../shared/component/layout'
import { useTitle } from '../../../../shared/component/header'
import { steps } from '../_component/tour-stock'

import Modal, { ModalContainer } from '@/components/modal-v2'
import Select from '@/components/common/select/select-v1'
import Tour from '@/components/common/tour'
import { Form, FormField, FormLabel } from '@/components/ui/form'
import { FilterTable } from '@/shared/component/data-table/component'
import { useForm, useFieldArray } from 'react-hook-form'
import { CreateTransaction } from '@/utils/types/form'
import { CommandItem } from '@/components/ui/command'
import { DataTable } from '@/shared/component/data-table'
import { useApiData } from '@/shared/hooks/use-api-data'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import { useInventoryData } from '../_hook/use-inventory-data'
import { column } from './_component/column'


const HIDE = ['supplier', 'project']

const links = [
  {
    name: 'Inventory',
    path: PATH.DASHBOARD_OVERVIEW,
  },
  {
    name: 'Kelola',
    path: PATH.PROJECT_INDEX,
  },
  {
    name: 'Barang Keluar',
    path: PATH.INVENTORY_STOCK_OUT,
  },
]

export default function StockOutPage() {
  useTitle(links)

  const permission = usePermission()

  const [url] = useUrlState({ page: '' })

  const { data: transactions, isLoading } = useApiData(
    useTransactionPagination({
      type: 'out',
      ...(url.page !== '' ? { page: url.page } : undefined),
    })
  )

  const { goods } = useInventoryData()

  // handle tour
  const tours = useTour('manage-stock')

  const { mutate } = useCreateTransaction()
  const [open, setOpen] = useState(false)

  const form = useForm<CreateTransaction>({
    defaultValues: {
      date: '',
      supplierId: null,
      items: [{ goodsId: null, qty: null, price: null, type: 'out' }],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'items',
  })

  const onSubmit = async (data: CreateTransaction) => {
    mutate(
      { payload: data },
      {
        onSuccess: () => {
          setOpen(false)
          form.reset()
        },
      }
    )
  }

  const isAllowed = permission.includes('transaction:create')

  return (
    <>
      <DashboardLayout className='overflow-hidden'>
        <TitlePage className='mb-2'>
          <div className='flex gap-2 items-center'>
            <PackageMinus className='text-[#989CA8]' />
            <p className='text-dark font-medium'>Barang Masuk</p>
          </div>
        </TitlePage>
        <FilterTable
          onAdd={() => setOpen(!open)}
          className='border-t border-line'
          create={isAllowed}
        />
        <DataTable
          columns={column.filter((item) => !HIDE.includes(String(item.id)))}
          totalPages={transactions?.total_pages}
          data={transactions?.data || []}
          isLoading={isLoading}
          withPagination
        />
      </DashboardLayout>
      <Modal title='Barang keluar' open={open} setOpen={setOpen}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <ModalContainer setOpen={setOpen}>
              {fields.map((field, index) => (
                <div key={field.id}>
                  <div className='flex justify-between items-center bg-[#F1F5F9] pl-2 rounded-t-lg h-10 border-b border-[#E5EBF1]'>
                    <h3 className='text-sm font-medium text-dark'>
                      Barang ke-{index + 1}
                    </h3>
                    {index > 0 && (
                      <Button
                        type='button'
                        variant='ghost'
                        size='sm'
                        className='text-slate-600 hover:text-red-400 hover:bg-transparent'
                        onClick={() => remove(index)}
                      >
                        <X className='w-4 h-4' strokeWidth={3} />
                      </Button>
                    )}
                  </div>
                  <div className='p-4 bg-[#F8FAFC] rounded-b-lg'>
                    <div className='grid grid-cols-5 gap-4'>
                      <div className='flex flex-col gap-3 col-span-2'>
                        <FormLabel>Barang</FormLabel>
                        <Select
                          name={`items.${index}.goodsId`}
                          placeholder='Pilih barang'
                          preview={(val) => (
                            <span>
                              {
                                goods?.find((s: any) => s.id === Number(val))
                                  ?.name
                              }
                            </span>
                          )}
                        >
                          {goods?.map((item: any) => (
                            <CommandItem
                              key={item.id}
                              value={item.id.toString()}
                              onSelect={(value) => {
                                form.setValue(
                                  `items.${index}.goodsId`,
                                  Number(value)
                                )
                              }}
                            >
                              <span>{item.name}</span>
                            </CommandItem>
                          ))}
                        </Select>
                      </div>

                      <FormField
                        label='Kuantitas'
                        control={form.control}
                        name={`items.${index}.qty`}
                        render={({ field }) => (
                          <div className='relative'>
                            <Input
                              {...field}
                              value={field.value ?? ''}
                              onChange={(e) => {
                                const value = e.target.value
                                field.onChange(
                                  value === '' ? null : Number(value)
                                )
                              }}
                            />
                            {field.value && (
                              <div className='absolute top-0 right-0 h-full pr-3 flex items-center text-dark capitalize text-sm font-medium'>
                                {goods?.find(
                                  (s) =>
                                    s.id ===
                                    Number(form.watch(`items.${index}.goodsId`))
                                )?.measurement?.name || ''}
                              </div>
                            )}
                          </div>
                        )}
                      />

                      <div className='col-span-2'>
                        <FormField
                          label='Harga jual'
                          control={form.control}
                          name={`items.${index}.price`}
                          render={({ field }) => (
                            <Input
                              {...field}
                              value={field.value ?? ''}
                              onChange={(e) => {
                                const value = e.target.value
                                field.onChange(
                                  value === '' ? null : Number(value)
                                )
                              }}
                            />
                          )}
                        />
                      </div>
                    </div>
                  </div>
                  {index === fields.length - 1 && (
                    <div className='pt-2'>
                      <Button
                        type='button'
                        variant='secondary'
                        size='sm'
                        className='pl-2.5 pr-4 text-slate-600 font-normal gap-1'
                        onClick={() =>
                          append({
                            goodsId: null,
                            qty: null,
                            price: null,
                            type: 'out',
                          })
                        }
                      >
                        <Plus
                          size={14}
                          strokeWidth={2}
                          className='text-slate-500'
                        />
                        Tambah Item
                      </Button>
                    </div>
                  )}
                </div>
              ))}

              <div className='grid grid-cols-1 md:grid-cols-2 gap-4 items-center pt-4 mt-4 border-t border-line border-dashed'>
                <div className='col-start-2'>
                  <FormField
                    label='Tanggal'
                    control={form.control}
                    name='date'
                    render={({ field }) => (
                      <Input type='date' {...field} className='h-9 block' />
                    )}
                  />
                </div>
              </div>
            </ModalContainer>
          </form>
        </Form>
      </Modal>
      <DeleteTransaction />
      <DetailTransaction />

      <Tour steps={steps} {...tours} />
    </>
  )
}

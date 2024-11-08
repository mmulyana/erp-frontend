import { Form, FormField, FormLabel } from '@/components/ui/form'
import { useInventoryData } from '../../_hook/use-inventory-data'
import { FilterTable } from '@/components/data-table/component'
import Modal, { ModalContainer } from '@/components/modal-v2'
import Select from '@/components/common/select/select-v1'
import { useForm, useFieldArray } from 'react-hook-form'
import { CommandItem } from '@/components/ui/command'
import { DataTable } from '@/components/data-table'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import { column } from './column'
import {
  useCreateTransaction,
  useTransactionPagination,
} from '@/hooks/api/use-transaction'
import { Plus, X } from 'lucide-react'
import { CreateTransaction } from '@/utils/types/form'
import { useApiData } from '@/hooks/use-api-data'
import useUrlState from '@ahooksjs/use-url-state'

const HIDE = ['project']

export default function StockIn() {
  const [url] = useUrlState({ page: '' })

  const { data, isLoading } = useApiData(
    useTransactionPagination({
      type: 'in',
      ...(url.page !== '' ? { page: url.page } : undefined),
    })
  )

  const { goods, suppliers } = useInventoryData()

  const { mutate } = useCreateTransaction()
  const [open, setOpen] = useState(false)

  const form = useForm<CreateTransaction>({
    defaultValues: {
      date: '',
      supplierId: null,
      items: [{ goodsId: null, qty: null, price: null, type: 'in' }],
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

  return (
    <div className='p-4'>
      <div className='rounded-lg border overflow-hidden'>
        <FilterTable onAdd={() => setOpen(!open)} />
        <DataTable
          columns={column.filter((item) => !HIDE.includes(String(item.id)))}
          data={data?.data || []}
          isLoading={isLoading}
          withLoading
          withPagination
          totalPages={data?.total_pages}
          styleFooter='border-b-0 border-t'
        />
      </div>

      <Modal title='Barang masuk' open={open} setOpen={setOpen}>
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
                    <div className='grid grid-cols-3 gap-4'>
                      <div className='flex flex-col gap-3'>
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

                      <FormField
                        label='Harga beli'
                        control={form.control}
                        name={`items.${index}.price`}
                        render={({ field }) => (
                          <div className='relative'>
                            <Input
                              type='number'
                              {...field}
                              value={field.value ?? ''}
                              onChange={(e) => {
                                const value = e.target.value
                                field.onChange(
                                  value === '' ? null : Number(value)
                                )
                              }}
                            />
                          </div>
                        )}
                      />
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
                            type: 'in',
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
                <div className='flex flex-col gap-3'>
                  <FormLabel>Supplier</FormLabel>
                  <Select
                    name='supplierId'
                    placeholder='Pilih supplier'
                    preview={(val) => (
                      <span>
                        {
                          suppliers?.find((s: any) => s.id === Number(val))
                            ?.name
                        }
                      </span>
                    )}
                  >
                    {suppliers?.map((item: any) => (
                      <CommandItem
                        key={item.id}
                        value={item.id.toString()}
                        onSelect={(value) => {
                          form.setValue('supplierId', Number(value))
                        }}
                      >
                        <span>{item.name}</span>
                      </CommandItem>
                    ))}
                  </Select>
                </div>

                <FormField
                  label='Tanggal'
                  control={form.control}
                  name='date'
                  render={({ field }) => (
                    <Input type='date' {...field} className='block' />
                  )}
                />
              </div>
            </ModalContainer>
          </form>
        </Form>
      </Modal>
    </div>
  )
}

import { Form, FormField, FormLabel } from '@/components/ui/form'
import { FilterTable } from '@/components/data-table/component'
import Modal, { ModalContainer } from '@/components/modal-v2'
import Select from '@/components/common/select/select-v1'
import { useForm, useFieldArray } from 'react-hook-form'
import { CreateTransaction } from '@/utils/types/form'
import { CommandItem } from '@/components/ui/command'
import { DataTable } from '@/components/data-table'
import { useGoods } from '@/hooks/api/use-goods'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useMemo, useState } from 'react'
import { column } from './column'
import {
  useCreateTransaction,
  useTransaction,
} from '@/hooks/api/use-transaction'
import { Plus, X } from 'lucide-react'

// import { ChartConfig } from '@/components/ui/chart'
// const reportData = [
//   { month: 'Januari', total: 186 },
//   { month: 'Februari', total: 305 },
//   { month: 'Maret', total: 237 },
//   { month: 'April', total: 73 },
//   { month: 'Mei', total: 209 },
//   { month: 'Juni', total: 214 },
// ]
// const reportConfig = {
//   total: {
//     label: 'Total',
//     color: '#2A9D90',
//   },
// } satisfies ChartConfig

// const stockData = [
//   { goods: 'Helm', total: 186 },
//   { goods: 'Sepatu', total: 305 },
//   { goods: 'Masker', total: 237 },
// ]
// const stockConfig = {
//   total: {
//     label: 'Total',
//     color: '#2A9D90',
//   },
// } satisfies ChartConfig

export default function StockOpname() {
  const qTransaction = useTransaction({ type: 'opname' })
  const data = useMemo(
    () => qTransaction.data?.data?.data,
    [qTransaction.isLoading, qTransaction.isFetching, qTransaction.data]
  )

  const qGoods = useGoods()
  const goods = useMemo(
    () => qGoods.data?.data.data || [],
    [qGoods.isLoading, qGoods.isFetching, qGoods.data]
  )

  const { mutate } = useCreateTransaction()
  const [open, setOpen] = useState(false)

  const form = useForm<CreateTransaction>({
    defaultValues: {
      date: '',
      supplierId: '',
      items: [{ goodsId: '', qty: '', price: '', type: 'opname' }],
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
          columns={column.filter(item => item.id !== 'supplier')}
          data={data || []}
          isLoading={qTransaction.isLoading}
          withLoading
          withPagination
          styleFooter='border-b-0 border-t'
        />
      </div>

      <Modal title='Opname' open={open} setOpen={setOpen}>
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
                                goods.find((s: any) => s.id === Number(val))
                                  ?.name
                              }
                            </span>
                          )}
                        >
                          {goods.map((item: any) => (
                            <CommandItem
                              key={item.id}
                              value={item.id.toString()}
                              onSelect={(value) => {
                                form.setValue(`items.${index}.goodsId`, value)
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
                            <Input type='number' {...field} className='h-9' />
                            {field.value && (
                              <div className='absolute top-0 right-0 bg-gray-100 h-full px-2 rounded-r-lg flex items-center border text-dark/50 capitalize text-sm'>
                                {
                                  goods.find(
                                    (s) =>
                                      s.id ===
                                      Number(
                                        form.watch(`items.${index}.goodsId`)
                                      )
                                  )?.measurement.name
                                }
                              </div>
                            )}
                          </div>
                        )}
                      />

                      <FormField
                        label='Harga jual'
                        control={form.control}
                        name={`items.${index}.price`}
                        render={({ field }) => (
                          <Input type='number' {...field} className='h-9' />
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
                            goodsId: '',
                            qty: '',
                            price: '',
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
    </div>
  )
}

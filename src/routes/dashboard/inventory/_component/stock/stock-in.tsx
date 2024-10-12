import {
  useCreateTransaction,
  useTransaction,
} from '@/hooks/api/use-transaction'
import { useMemo, useState } from 'react'
import { DataTable } from '@/components/data-table'
import { column } from './column'
import { useForm } from 'react-hook-form'
import { CreateTransaction } from '@/utils/types/form'
import Modal, { ModalContainer } from '@/components/modal-v2'
import { Form, FormField } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import InputFile from '@/components/common/input-file'
import { useGoods } from '@/hooks/api/use-goods'
import { CommandItem } from '@/components/ui/command'
import { Textarea } from '@/components/ui/textarea'
import { useSupplier } from '@/hooks/api/use-supplier'
import Select from '@/components/common/select/select-v1'
import { FilterTable } from '@/components/data-table/component'
import { ChartConfig } from '@/components/ui/chart'
import CardBar from '@/components/chart/bar'
import CardBarHorizontal from '@/components/chart/bar-horizontal'

const reportData = [
  { month: 'Januari', total: 186 },
  { month: 'Februari', total: 305 },
  { month: 'Maret', total: 237 },
  { month: 'April', total: 73 },
  { month: 'Mei', total: 209 },
  { month: 'Juni', total: 214 },
]
const reportConfig = {
  total: {
    label: 'Total',
    color: '#2A9D90',
  },
} satisfies ChartConfig

const stockData = [
  { goods: 'Helm', total: 186 },
  { goods: 'Sepatu', total: 305 },
  { goods: 'Masker', total: 237 },
]
const stockConfig = {
  total: {
    label: 'Total',
    color: '#2A9D90',
  },
} satisfies ChartConfig

export default function StockIn() {
  const queryTransaction = useTransaction({ type: 'in' })
  const data = useMemo(
    () => queryTransaction.data?.data?.data,
    [queryTransaction.isLoading, queryTransaction.isFetching]
  )

  const queryGoods = useGoods({})
  const goods = useMemo(
    () => queryGoods.data?.data.data || [],
    [queryGoods.isLoading, queryGoods.isFetching]
  )
  const querySupplier = useSupplier({})
  const suppliers = useMemo(
    () => querySupplier.data?.data.data || [],
    [querySupplier.isLoading, querySupplier.isFetching]
  )

  // HANDLE FORM
  const { mutate } = useCreateTransaction()

  const form = useForm<CreateTransaction>({
    defaultValues: {
      date: '',
      description: '',
      goodsId: '',
      isReturned: '',
      photo: undefined,
      price: '',
      qty: '',
      supplierId: '',
      type: 'in',
    },
  })

  const onSubmit = async (data: CreateTransaction) => {
    mutate(
      { payload: data },
      {
        onSuccess: () => {
          queryTransaction.refetch()
          setOpen(false)
          form.reset()
        },
      }
    )
  }

  const [open, setOpen] = useState(false)
  const [openGoods, setOpenGoods] = useState(false)
  const [openSupplier, setOpenSupplier] = useState(false)

  return (
    <div className='grid grid-cols-1 md:grid-cols-[1fr_340px]'>
      <div>
        <FilterTable />
        {/* <TopHeader title='Barang masuk' onClick={() => setOpen(true)} /> */}
        <DataTable
          columns={column}
          data={data || []}
          isLoading={queryTransaction.isLoading || queryGoods.isFetching}
          withLoading
          withPagination
        />
      </div>
      <div className='h-[calc(100vh-141px)] border-l border-line p-4 space-y-4'>
        <CardBar
          title='Laporan Stok Masuk Bulanan'
          config={reportConfig}
          data={reportData}
          dataKeyBar='total'
          dataKeyX='month'
        />
        <CardBarHorizontal
          title='Laporan Stok Masuk'
          config={stockConfig}
          data={stockData}
          dataKeyBar='total'
          dataKeyX='goods'
        />
      </div>
      <Modal title='Tambah barang masuk' open={open} setOpen={setOpen}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <ModalContainer setOpen={setOpen}>
              <Select
                open={openGoods}
                setOpen={setOpenGoods}
                name='goodsId'
                placeholder='Pilih barang'
                preview={(val) => (
                  <span>
                    {goods.find((s: any) => s.id === Number(val))?.name}
                  </span>
                )}
              >
                {goods.map((item: any) => (
                  <CommandItem
                    key={item.id}
                    value={item.id.toString()}
                    onSelect={(value) => {
                      form.setValue('goodsId', value)
                      setOpenGoods(false)
                    }}
                  >
                    <span>{item.name}</span>
                  </CommandItem>
                ))}
              </Select>
              <Select
                open={openSupplier}
                setOpen={setOpenSupplier}
                name='supplierId'
                placeholder='Pilih toko'
                preview={(val) => (
                  <span>
                    {suppliers.find((s: any) => s.id === Number(val))?.name}
                  </span>
                )}
              >
                {goods.map((item: any) => (
                  <CommandItem
                    key={item.id}
                    value={item.id.toString()}
                    onSelect={(value) => {
                      form.setValue('supplierId', value)
                      setOpenSupplier(false)
                    }}
                  >
                    <span>{item.name}</span>
                  </CommandItem>
                ))}
              </Select>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <FormField
                  label='Kuantitas'
                  control={form.control}
                  name='qty'
                  render={({ field }) => <Input type='number' {...field} />}
                />
                <FormField
                  label='Harga'
                  control={form.control}
                  name='price'
                  render={({ field }) => <Input type='number' {...field} />}
                />
              </div>
              <FormField
                label='Tanggal'
                control={form.control}
                name='date'
                render={({ field }) => (
                  <Input type='date' {...field} className='block' />
                )}
              />
              <InputFile name='photo' label='Photo' />
              <FormField
                label='Keterangan'
                control={form.control}
                name='description'
                render={({ field }) => <Textarea {...field} />}
              />
            </ModalContainer>
          </form>
        </Form>
      </Modal>
    </div>
  )
}

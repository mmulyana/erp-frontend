import {
  useCreateTransaction,
  useTransaction,
} from '@/hooks/api/use-transaction'
import { useMemo, useState } from 'react'
import { DataTable } from '@/components/data-table'
import { column } from './column'
import { useGoods } from '@/hooks/api/use-goods'
import { useForm } from 'react-hook-form'
import { CreateTransaction } from '@/utils/types/form'
import Modal, { ModalContainer } from '@/components/modal-v2'
import { Form, FormField } from '@/components/ui/form'
import SelectV1 from '@/components/common/select/select-v1'
import { CommandItem } from '@/components/ui/command'
import { Input } from '@/components/ui/input'
import InputFile from '@/components/common/input-file'
import { Textarea } from '@/components/ui/textarea'
import { useProject } from '@/hooks/api/use-project'
import { FilterTable } from '@/components/data-table/component'
import { ChartConfig } from '@/components/ui/chart'
import CardBarMultiple from '@/components/chart/bar-multiple'
import CardBarHorizontal from '@/components/chart/bar-horizontal'

const reportData = [
  { month: 'April', borrowed: 73, returned: 190 },
  { month: 'May', borrowed: 209, returned: 130 },
  { month: 'June', borrowed: 214, returned: 140 },
]
const reportConfig = {
  borrowed: {
    label: 'Dipinjam',
    color: 'hsl(var(--chart-1))',
  },
  returned: {
    label: 'Returned',
    color: 'hsl(var(--chart-2))',
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

export default function StockBorrowed() {
  const queryTransaction = useTransaction({ type: 'borrowed' })
  const data = useMemo(
    () => queryTransaction.data?.data?.data,
    [queryTransaction.isLoading, queryTransaction.isFetching]
  )

  const queryGoods = useGoods({})
  const goods = useMemo(
    () => queryGoods.data?.data.data || [],
    [queryGoods.isLoading, queryGoods.isFetching]
  )
  const queryProject = useProject()
  const projects = useMemo(
    () => queryProject.data?.data.data || [],
    [queryProject.isLoading, queryProject.isFetching]
  )
  console.log(projects)

  // HANDLE FORM
  const { mutate } = useCreateTransaction()

  const form = useForm<CreateTransaction>({
    defaultValues: {
      date: '',
      description: '',
      goodsId: '',
      projectId: '',
      isReturned: '',
      photo: null as File | null,
      qty: '',
      type: 'borrowed',
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
  const [openProject, setOpenProject] = useState(false)

  return (
    <div className='grid grid-cols-1 md:grid-cols-[1fr_340px]'>
      <div>
        {/* <TopHeader title='Peminjaman' onClick={() => setOpen(true)} /> */}
        <FilterTable />
        <DataTable
          columns={column.filter(
            (col) => col.id !== 'supplier' && col.id !== 'price'
          )}
          data={data || []}
          isLoading={queryTransaction.isLoading || queryTransaction.isFetching}
          withLoading
          withPagination
        />
      </div>
      <div className='h-[calc(100vh-141px)] border-l border-line p-4 space-y-4'>
        <CardBarMultiple
          title='Laporan Peminjaman Bulanan'
          config={reportConfig}
          data={reportData}
          dataKeyBar1='borrowed'
          dataKeyBar2='returned'
          dataKeyX='month'
        />
        <CardBarHorizontal
          title='Laporan Stok Dipinjam'
          config={stockConfig}
          data={stockData}
          dataKeyBar='total'
          dataKeyX='goods'
        />
      </div>
      <Modal title='Tambah peminjaman' open={open} setOpen={setOpen}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <ModalContainer setOpen={setOpen}>
              <SelectV1
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
              </SelectV1>
              <SelectV1
                open={openProject}
                setOpen={setOpenProject}
                name='projectId'
                placeholder='Pilih proyek'
                preview={(val) => (
                  <span>
                    {projects.find((s: any) => s.id === Number(val))?.name}
                  </span>
                )}
              >
                {projects.map((item: any) => (
                  <CommandItem
                    key={item.id}
                    value={item.id.toString()}
                    onSelect={(value) => {
                      form.setValue('projectId', value)
                      setOpenProject(false)
                    }}
                  >
                    <span>{item.name}</span>
                  </CommandItem>
                ))}
              </SelectV1>
              <FormField
                label='Kuantitas'
                control={form.control}
                name='qty'
                render={({ field }) => <Input type='number' {...field} />}
              />
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

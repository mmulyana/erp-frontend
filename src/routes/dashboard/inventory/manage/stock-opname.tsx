import {
  useCreateTransaction,
  useTransaction,
} from '@/hooks/api/use-transaction'
import { DashboardLayout } from '../../_component/layout'
import { useMemo, useState } from 'react'
import Container from '../../_component/container'
import { DataTable } from '@/components/data-table'
import { column } from './_component/column'
import TopHeader from '../_component/top-header'
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

export default function StockOpname() {
  const queryTransaction = useTransaction({ type: 'opname' })
  const data = useMemo(
    () => queryTransaction.data?.data?.data,
    [queryTransaction.isLoading, queryTransaction.isFetching]
  )

  const queryGoods = useGoods({})
  const goods = useMemo(
    () => queryGoods.data?.data.data || [],
    [queryGoods.isLoading, queryGoods.isFetching]
  )

  // HANDLE FORM
  const { mutate } = useCreateTransaction()

  const form = useForm<CreateTransaction>({
    defaultValues: {
      date: '',
      description: '',
      goodsId: '',
      photo: null as File | null,
      qty: '',
      type: 'opname',
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

  return (
    <DashboardLayout>
      <Container className='flex flex-col gap-4'>
        <TopHeader title='Opname' onClick={() => setOpen(true)} />
        <DataTable
          columns={column.filter(
            (col) => col.id !== 'supplier' && col.id !== 'price'
          )}
          data={data || []}
          isLoading={queryTransaction.isLoading || queryTransaction.isFetching}
          withLoading
          withPagination
        />
      </Container>
      <Modal title='Tambah barang opname' open={open} setOpen={setOpen}>
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
    </DashboardLayout>
  )
}

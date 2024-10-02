import { useTransaction } from '@/hooks/api/use-transaction'
import { DashboardLayout } from '../../_component/layout'
import { useMemo, useState } from 'react'
import Container from '../../_component/container'
import { DataTable } from '@/components/data-table'
import { column } from './_component/column'
import TopHeader from '../_component/top-header'
import { useForm } from 'react-hook-form'
import { CreateTransaction } from '@/utils/types/form'
import Modal, { ModalContainer } from '@/components/modal-v2'
import { Form, FormField } from '@/components/ui/form'
import { Input } from '@/components/ui/input'

export default function StockIn() {
  const { data: transaction, isLoading } = useTransaction({ type: 'in' })
  const data = useMemo(() => transaction?.data?.data, [isLoading])

  // HANDLE FORM
  const form = useForm<CreateTransaction>({
    defaultValues: {
      date: '',
      description: '',
      goodsId: '',
      isReturned: undefined,
      photo: null as File | null,
      price: '',
      qty: '',
      supplierId: '',
      type: 'in',
    },
  })

  const onSubmit = async (data: CreateTransaction) => {
    console.log(data)
  }

  const [open, setOpen] = useState(false)

  return (
    <DashboardLayout>
      <Container className='flex flex-col gap-4'>
        <TopHeader title='Barang masuk' onClick={() => setOpen(true)} />
        <DataTable
          columns={column}
          data={data || []}
          isLoading={isLoading}
          withLoading
          withPagination
        />
      </Container>
      <Modal title='Tambah barang masuk' open={open} setOpen={setOpen}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <ModalContainer setOpen={setOpen}>
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
            </ModalContainer>
          </form>
        </Form>
      </Modal>
    </DashboardLayout>
  )
}

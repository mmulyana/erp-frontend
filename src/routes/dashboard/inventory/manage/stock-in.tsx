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
import { Controller, useForm } from 'react-hook-form'
import { CreateTransaction } from '@/utils/types/form'
import Modal, { ModalContainer } from '@/components/modal-v2'
import { Form, FormField } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import InputFile from '@/components/common/input-file'
import { useGoods } from '@/hooks/api/use-goods'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { Textarea } from '@/components/ui/textarea'
import { useSupplier } from '@/hooks/api/use-supplier'

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
      photo: null as File | null,
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
    <DashboardLayout>
      <Container className='flex flex-col gap-4'>
        <TopHeader title='Barang masuk' onClick={() => setOpen(true)} />
        <DataTable
          columns={column}
          data={data || []}
          isLoading={queryTransaction.isLoading || queryGoods.isFetching}
          withLoading
          withPagination
        />
      </Container>
      <Modal title='Tambah barang masuk' open={open} setOpen={setOpen}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <ModalContainer setOpen={setOpen}>
              <Controller
                name='goodsId'
                control={form.control}
                render={({ field }) => (
                  <Popover open={openGoods} onOpenChange={setOpenGoods}>
                    <PopoverTrigger className='w-full'>
                      <Button
                        variant='outline'
                        size='sm'
                        className='w-full justify-start'
                        type='button'
                      >
                        {field.value ? (
                          <span>
                            {
                              goods.find(
                                (s: any) => s.id === Number(field.value)
                              )?.name
                            }
                          </span>
                        ) : (
                          <span>Pilih kategori</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className='p-0' side='bottom' align='start'>
                      <Command>
                        <CommandInput placeholder='Change status...' />
                        <CommandList>
                          <CommandEmpty>No results found.</CommandEmpty>
                          <CommandGroup>
                            {goods.map((item: any) => (
                              <CommandItem
                                key={item.id}
                                value={item.id.toString()}
                                onSelect={(value) => {
                                  form.setValue('goodsId', value as string)
                                  setOpenGoods(false)
                                }}
                              >
                                <span>{item.name}</span>
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                )}
              />
              <Controller
                name='supplierId'
                control={form.control}
                render={({ field }) => (
                  <Popover open={openSupplier} onOpenChange={setOpenSupplier}>
                    <PopoverTrigger className='w-full'>
                      <Button
                        variant='outline'
                        size='sm'
                        className='w-full justify-start'
                        type='button'
                      >
                        {field.value ? (
                          <span>
                            {
                              suppliers.find(
                                (s: any) => s.id === Number(field.value)
                              )?.name
                            }
                          </span>
                        ) : (
                          <span>Pilih supplier</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className='p-0' side='bottom' align='start'>
                      <Command>
                        <CommandInput placeholder='Change status...' />
                        <CommandList>
                          <CommandEmpty>No results found.</CommandEmpty>
                          <CommandGroup>
                            {suppliers.map((item: any) => (
                              <CommandItem
                                key={item.id}
                                value={item.id.toString()}
                                onSelect={(value) => {
                                  form.setValue('supplierId', value as string)
                                  setOpenSupplier(false)
                                }}
                              >
                                <span>{item.name}</span>
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                )}
              />
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
    </DashboardLayout>
  )
}

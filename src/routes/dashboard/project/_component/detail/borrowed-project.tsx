import { ChevronsUpDown, Ellipsis, Undo2 } from 'lucide-react'
import { useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { format } from 'date-fns'

import { useApiData } from '@/shared/hooks/use-api-data'
import { useGoods } from '@/hooks/api/use-goods'
import { KEYS } from '@/utils/constant/_keys'
import {
  useCreateTransaction,
  useProjectTransaction,
  useReturnedTransaction,
} from '@/hooks/api/use-transaction'
import { cn } from '@/utils/cn'

import Modal, { ModalContainer } from '@/components/modal-v2'
import ProtectedComponent from '@/components/protected'
import { Form, FormField } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import EmptyState from '@/components/common/empty-state'

type Props = {
  id?: number | null
}
export default function BorrowedProject({ id }: Props) {
  const [open, setOpen] = useState(false)

  const { mutate: returned } = useReturnedTransaction()

  const { data } = useApiData(useProjectTransaction({ id, enabled: !!id }))

  return (
    <>
      <div>
        <div className='w-full pb-4 flex justify-between items-center'>
          <p className='text-dark'>Peminjaman</p>
          {/* <ProtectedComponent required={['project:borrow-goods']}> */}
          <Button
            variant='secondary'
            className='text-sm text-dark font-normal h-fit'
            onClick={() => setOpen(!open)}
          >
            Tambah
          </Button>
          {/* </ProtectedComponent> */}
        </div>
        {data?.length ? (
          <div className='border border-line rounded-lg bg-white'>
            {data?.map((item, index) => (
              <div
                key={`transaction-${item.id}`}
                className={cn(
                  'flex justify-between items-center border-b border-line p-2.5',
                  index === data.length - 1 && 'border-none'
                )}
              >
                <div className='flex flex-col gap-1'>
                  <p
                    className={cn(
                      'text-dark font-medium',
                      item.is_returned && 'line-through text-dark/50'
                    )}
                  >
                    {item.good.name}
                  </p>
                  <div className='flex gap-2 items-center'>
                    <p
                      className={cn(
                        'text-sm text-dark/80',
                        item.is_returned && 'line-through text-dark/50'
                      )}
                    >
                      Sebanyak{' '}
                      <span
                        className={cn(
                          'text-dark font-medium',
                          item.is_returned && 'text-inherit'
                        )}
                      >
                        {item.qty}
                      </span>{' '}
                      {item.good.measurement?.name}
                    </p>
                    <div className='h-1 w-1 rounded-full bg-gray-500'></div>
                    <p className='text-sm'>{format(item.date, 'dd/MM/yyyy')}</p>
                  </div>
                </div>
                <ProtectedComponent required={['project:borrow-goods']}>
                  <div className='flex gap-4 items-center'>
                    {!item.is_returned && (
                      <Button
                        className='bg-yellow-100 hover:bg-yellow-500 h-8 rounded-full pl-3 pr-2'
                        variant='secondary'
                        onClick={() => returned({ id: item.id })}
                      >
                        Kembalikan
                        <Undo2
                          size={16}
                          className='text-yellow-600 group-hover:text-white'
                        />
                      </Button>
                    )}
                    <DropdownMenu modal={false}>
                      <DropdownMenuTrigger asChild>
                        <Button
                          className='w-8 h-8 rounded-full border border-dark/[0.12] p-0'
                          variant='outline'
                        >
                          <Ellipsis size={16} />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuGroup>
                          {!item.is_returned && (
                            <DropdownMenuItem
                              className='rounded-none text-sm text-dark/70 cursor-pointer'
                              onClick={() => {}}
                            >
                              Edit
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem
                            className='rounded-none text-sm text-dark/70 cursor-pointer'
                            onClick={() => {}}
                          >
                            Hapus
                          </DropdownMenuItem>
                        </DropdownMenuGroup>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </ProtectedComponent>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState />
        )}
      </div>

      <DialogForm open={open} setOpen={setOpen} id={id} />
    </>
  )
}

function DialogForm({
  open,
  setOpen,
  id,
}: {
  id?: number | null
  open: boolean
  setOpen: (val: boolean) => void
}) {
  const queryClient = useQueryClient()

  const [name, setName] = useState('')

  const { mutate: create } = useCreateTransaction()
  const { data: goods } = useApiData(
    useGoods({ ...(name !== '' ? { name } : undefined) })
  )

  const form = useForm({
    defaultValues: {
      goodId: '',
      qty: '',
    },
  })

  const submit = (data: any) => {
    if (!id) return

    create(
      {
        payload: {
          date: new Date().toISOString(),
          projectId: Number(id),
          items: [
            {
              goodsId: Number(data.goodId),
              qty: Number(data.qty),
              type: 'borrowed',
            },
          ],
        },
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: [KEYS.TRANSACTION_PROJECT, id],
          })
          queryClient.invalidateQueries({
            queryKey: [KEYS.GOODS_ALL],
          })
          form.reset()
          setOpen(false)
        },
      }
    )
  }

  return (
    <Modal open={open} setOpen={setOpen} title='Tambah'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(submit)}>
          <ModalContainer setOpen={setOpen}>
            <div>
              <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                <div className='col-span-1 md:col-span-2'>
                  <FormField
                    label='Barang'
                    name='goodId'
                    control={form.control}
                    render={({ field }) => (
                      <Popover>
                        <PopoverTrigger className='border' asChild>
                          <Button
                            variant='outline'
                            role='combobox'
                            aria-expanded={open}
                            className='w-full px-2 h-10 justify-between text-dark'
                          >
                            {field.value
                              ? goods?.find(
                                  (item) => item.id === Number(field.value)
                                )?.name
                              : 'Pilih barang'}
                            <ChevronsUpDown size={16} className='opacity-50' />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent
                          side='bottom'
                          className='p-0'
                          style={{
                            width: 'var(--radix-popover-trigger-width)',
                          }}
                        >
                          <Command shouldFilter={false}>
                            <CommandInput
                              placeholder='Cari...'
                              value={name}
                              onValueChange={setName}
                            />
                            <CommandList>
                              <CommandEmpty>tidak ditemukan</CommandEmpty>
                              <CommandGroup className='h-48 overflow-auto'>
                                {goods?.map((item) => (
                                  <CommandItem
                                    key={item.id}
                                    value={String(item.id)}
                                    onSelect={field.onChange}
                                    disabled={item.available === 0}
                                  >
                                    <div className='flex gap-2 items-center'>
                                      <div className='w-16 h-16 rounded-lg bg-dark/5'></div>
                                      <div className='flex flex-col gap-1'>
                                        <p className='text-base text-dark'>
                                          {item.name}
                                        </p>
                                        <p className='text-dark/50'>
                                          {!!item.available ? (
                                            <>
                                              Tersedia{' '}
                                              <span className='text-dark font-medium'>
                                                {item.available}
                                              </span>
                                            </>
                                          ) : (
                                            'Persediaan Habis'
                                          )}
                                        </p>
                                      </div>
                                    </div>
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name='qty'
                  label='Kuantitas'
                  render={({ field }) => <Input {...field} />}
                />
              </div>
            </div>
          </ModalContainer>
        </form>
      </Form>
    </Modal>
  )
}

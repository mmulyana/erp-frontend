import Modal, { ModalContainer } from '@/components/modal-v2'
import { Button } from '@/components/ui/button'
import { Form, FormField } from '@/components/ui/form'
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Textarea } from '@/components/ui/textarea'
import {
  useCreateCashAdvance,
  useDetailCashAdvance,
  useUpdateCashAdvance,
} from '@/hooks/api/use-cash-advance'
import { useAllEmployees } from '@/hooks/api/use-employee'
import { useApiData } from '@/hooks/use-api-data'

import { createCashAdvance } from '@/utils/types/form'
import { Check, ChevronsUpDown } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

type Props = {
  open: boolean
  setOpen: (val: boolean) => void
  id?: number | null
}

export function ModalAdd({ open, setOpen, id }: Props) {
  const [openPopover, setOpenPopover] = useState(false)
  
  const [search, setSearch] = useState('')
  const { data: employees } = useApiData(
    useAllEmployees({ enabled: open, name: search })
  )
  const { data, isLoading } = useDetailCashAdvance({
    id,
    enabled: open && !!id,
  })

  const { mutate: create } = useCreateCashAdvance()
  const { mutate: update } = useUpdateCashAdvance()

  const form = useForm<createCashAdvance>({
    defaultValues: {
      employeeId: null,
      amount: 0,
      description: '',
      requestDate: new Date().toISOString().split('T')[0],
    },
  })

  const submit = async (payload: createCashAdvance) => {
    if (id) {
      update(
        { id, payload },
        {
          onSuccess: () => {
            setOpen(false)
          },
        }
      )
      return
    }
    create(
      {
        ...payload,
        employeeId: Number(payload.employeeId),
        requestDate: new Date(payload.requestDate).toISOString().split('T')[0],
      },
      {
        onSuccess: () => {
          setOpen(false)
        },
      }
    )
  }

  useEffect(() => {
    if (!open) {
      form.reset({
        employeeId: null,
        amount: 0,
        description: '',
        requestDate: new Date().toISOString().split('T')[0],
      })
    }
  }, [open, form])

  useEffect(() => {
    if (id && open && !isLoading && data?.data.data) {
      const { amount, description, employeeId, requestDate } = data.data.data

      form.reset({
        amount: Number(amount),
        description,
        employeeId,
        requestDate: new Date(requestDate).toISOString().split('T')[0],
      })
    }
  }, [open, isLoading, data, id, form])

  return (
    <Modal title='Kasbon Baru' open={open} setOpen={setOpen}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(submit)} className='space-y-4'>
          <ModalContainer setOpen={setOpen}>
            <FormField
              control={form.control}
              name='employeeId'
              label='Pegawai'
              render={({ field }) => (
                <Popover
                  modal={false}
                  open={openPopover}
                  onOpenChange={setOpenPopover}
                >
                  <PopoverTrigger asChild>
                    <Button
                      variant='outline'
                      className='pr-2 pl-2.5 gap-2 w-full justify-between h-10'
                    >
                      {field.value
                        ? employees?.find((item) => item.id === field.value)
                            ?.fullname
                        : 'Tambah Pegawai'}
                      <ChevronsUpDown size={16} />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className='p-0'
                    style={{
                      width: 'var(--radix-popover-trigger-width)',
                    }}
                  >
                    <Command shouldFilter={false}>
                      <CommandInput
                        placeholder='Cari peran'
                        onValueChange={setSearch}
                        value={search}
                      />
                      <CommandList>
                        <CommandEmpty>Peran tidak ditemukan</CommandEmpty>
                        <CommandGroup>
                          {employees?.map((item) => (
                            <CommandItem
                              key={item.id}
                              value={item.fullname}
                              onSelect={() => {
                                form.setValue('employeeId', item.id)
                                setOpenPopover(false)
                              }}
                              className='flex justify-between items-center'
                            >
                              <span>{item.fullname}</span>
                              {item.id === field.value && (
                                <div className='h-6 w-6 rounded-full flex justify-center items-center bg-green-primary text-white'>
                                  <Check size={14} strokeWidth={2.9} />
                                </div>
                              )}
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
                control={form.control}
                name='amount'
                label='Jumlah'
                render={({ field }) => (
                  <Input
                    type='number'
                    onChange={(e) => field.onChange(e.target.valueAsNumber)}
                    value={field.value}
                    onBlur={(e) => {
                      field.onBlur()
                      if (isNaN(e.target.valueAsNumber)) {
                        form.setValue('amount', 0)
                      }
                    }}
                  />
                )}
              />
              <FormField
                control={form.control}
                name='requestDate'
                label='Tanggal'
                render={({ field }) => (
                  <Input
                    type='date'
                    value={
                      typeof field.value === 'string'
                        ? field.value
                        : field.value.toISOString().split('T')[0]
                    }
                    onChange={(e) => field.onChange(e.target.value)}
                    className='block'
                  />
                )}
              />
            </div>
            <FormField
              control={form.control}
              name='description'
              label='Deskripsi'
              render={({ field }) => (
                <Textarea
                  placeholder='Keterangan'
                  {...field}
                  value={field.value || ''}
                />
              )}
            />
          </ModalContainer>
        </form>
      </Form>
    </Modal>
  )
}

import Modal, { ModalContainer } from '@/components/modal-v2'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { Form, FormField } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Textarea } from '@/components/ui/textarea'
import { useAllEmployees } from '@/hooks/api/use-employee'
import {
  useCreateOvertime,
  useOvertimeDetail,
  useUpdateOvertime,
} from '@/hooks/api/use-overtime'
import { useApiData } from '@/hooks/use-api-data'
import { BASE_URL } from '@/utils/constant/_urls'
import useUrlState from '@ahooksjs/use-url-state'
import { zodResolver } from '@hookform/resolvers/zod'
import { format, parse } from 'date-fns'
import { ChevronsUpDown } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

export type OvertimeSchema = z.infer<typeof overtimeSchema>
export const overtimeSchema = z.object({
  employeeId: z.number(),
  date: z.string(),
  total_hour: z.number(),
  description: z.string().optional(),
})
type Props = {
  open: boolean
  setOpen: (val: boolean) => void
  id?: number | null
}
export function AddOvertime({ open, setOpen, id }: Props) {
  const { data: detail, isLoading } = useApiData(
    useOvertimeDetail({ id, enabled: open && !!id })
  )

  const { mutate: create } = useCreateOvertime()
  const { mutate: update } = useUpdateOvertime()

  const [url] = useUrlState({ date: '' })

  const form = useForm<OvertimeSchema>({
    resolver: zodResolver(overtimeSchema),
    defaultValues: {
      total_hour: 0,
      date: '',
      description: '',
    },
  })

  const submit = async (data: OvertimeSchema) => {
    if (id) {
      update(
        {
          id,
          payload: {
            total_hour: data.total_hour,
            date: data.date,
            description: data.description,
          },
        },
        {
          onSuccess: async () => {
            form.reset()
            setOpen(false)
          },
        }
      )
      return
    }
    create(
      {
        ...data,
        employeeId: Number(data.employeeId),
        date: data.date,
      },
      {
        onSuccess: async () => {
          form.reset()
          setOpen(false)
        },
      }
    )
  }

  useEffect(() => {
    if (url.date !== '') {
      const parsedDate = parse(url.date, 'yyyy-MM-dd', new Date())
      form.setValue('date', format(parsedDate, 'yyyy-MM-dd'))
    }
  }, [url.date])

  useEffect(() => {
    if (!open) {
      form.reset({
        total_hour: 0,
        date: '',
        description: '',
        employeeId: undefined,
      })
    }
  }, [open])

  useEffect(() => {
    if (!!id && open && detail && !isLoading) {
      const { date, employeeId, total_hour, description } = detail
      form.reset({
        description: description || '',
        employeeId,
        total_hour,
        date: new Date(date).toISOString().split('T')[0],
      })
    }
  }, [open, detail, isLoading, id])

  // HANDLE SELECT
  const [name, setName] = useState('')
  const { data: employees } = useApiData(
    useAllEmployees({ enabled: open, name })
  )

  return (
    <Modal title='Lemburan' open={open} setOpen={setOpen}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(submit)}>
          <ModalContainer setOpen={setOpen}>
            <FormField
              label='Pegawai'
              name='employeeId'
              control={form.control}
              render={({ field }) => (
                <Popover>
                  <PopoverTrigger className='border' asChild>
                    <Button
                      variant='outline'
                      role='combobox'
                      className='w-full px-2 h-10 justify-between text-dark'
                      disabled={!!id || false}
                    >
                      {field.value
                        ? employees?.find(
                            (item) => item.id === Number(field.value)
                          )?.fullname
                        : 'Pilih Pegawai'}
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
                          {employees?.map((item) => (
                            <CommandItem
                              key={item.id}
                              value={String(item.id)}
                              onSelect={(val) => {
                                form.setValue('employeeId', Number(val))
                              }}
                            >
                              <div className='flex gap-2 items-center'>
                                {item.photo ? (
                                  <img
                                    className='w-16 h-16 rounded-lg'
                                    src={BASE_URL + '/img/' + item.photo}
                                  />
                                ) : (
                                  <div className='w-16 h-16 rounded-lg bg-dark/5 flex items-center justify-center'>
                                    {item.fullname.at(0)}
                                  </div>
                                )}
                                <div className='flex flex-col gap-1'>
                                  <p className='text-base text-dark'>
                                    {item.fullname}
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

            <FormField
              control={form.control}
              name='date'
              label='Tanggal'
              render={({ field }) => (
                <Input {...field} className='block' type='date' />
              )}
            />
            <FormField
              control={form.control}
              name='total_hour'
              label='Total jam lembur'
              render={({ field }) => (
                <Input
                  {...field}
                  type='number'
                  onChange={(e) => field.onChange(e.target.valueAsNumber)}
                  onBlur={(e) => {
                    field.onBlur()
                    if (isNaN(e.target.valueAsNumber)) {
                      form.setValue('total_hour', 0)
                    }
                  }}
                />
              )}
            />

            <FormField
              control={form.control}
              name='description'
              render={({ field }) => (
                <Textarea placeholder='Keterangan' {...field} />
              )}
            />
          </ModalContainer>
        </form>
      </Form>
    </Modal>
  )
}

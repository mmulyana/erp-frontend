import { format, isValid, subDays, parse, isToday } from 'date-fns'
import {
  CalendarIcon,
  CheckIcon,
  Ellipsis,
  XIcon,
} from 'lucide-react'
import useUrlState from '@ahooksjs/use-url-state'
import { Button } from '@/components/ui/button'
import { id } from 'date-fns/locale'
import { useMemo, useState } from 'react'
import Search from '@/components/common/search'
import Filter from '@/components/common/filter'
import { ColumnDef } from '@tanstack/react-table'
import { cn } from '@/utils/cn'
import { DataTable } from '@/components/data-table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  useAttendances,
  useCreateAttendance,
  useUpdateAttendance,
} from '@/hooks/api/use-attendance'
import { useEmployees } from '@/hooks/api/use-employee'
import { useCreateOvertime, useOvertime } from '@/hooks/api/use-overtime'
import { useForm } from 'react-hook-form'
import { overtimeSchema, OvertimeSchema } from '@/utils/schema/overtime.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormField } from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Employee } from '@/utils/types/api'
import Modal, { ModalContainer } from '@/components/modal-v2'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Calendar } from '@/components/ui/calendar'

type AttendanceType = 'presence' | 'absent' | 'leave' | 'not_yet'

export function Regular() {
  const [url, setUrl] = useUrlState({ name: '', date: '' })
  const { mutate } = useCreateAttendance()

  const {
    data: employees,
    isLoading,
    isFetching,
  } = useAttendances({
    name: url.name,
    ...(url.date !== ''
      ? {
          date: format(parse(url.date, 'dd-MM-yyyy', new Date()), 'dd-MM-yyyy'),
        }
      : undefined),
  })
  const data = useMemo(
    () => employees?.data.data || [],
    [isLoading, isFetching]
  )

  return (
    <div className='bg-[#F9FAFB] p-4 h-[calc(100vh-141px)]'>
      <div className='flex justify-between items-center mb-4'>
        <div className='flex gap-4'>
          <div className='max-w-[180px]'>
            <Search />
          </div>
          <Filter />
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={'outline'}
                className={cn('w-[240px] pl-3 text-left font-normal')}
              >
                {url.date ? (
                  format(
                    parse(url.date, 'dd-MM-yyyy', new Date()),
                    'EEEE, dd MMM yyyy'
                  )
                ) : (
                  <span>Pick a date</span>
                )}
                <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
              </Button>
            </PopoverTrigger>
            <PopoverContent className='w-auto p-0' align='start'>
              <Calendar
                mode='single'
                // selected={field.value}
                onSelect={(val) => {
                  const originalDate = new Date(val as Date)
                  const formattedDate = format(originalDate, 'dd-MM-yyyy')
                  setUrl((prev) => ({ ...prev, date: formattedDate }))
                }}
                // disabled={(date) =>
                //   date > new Date() || date < new Date('1900-01-01')
                // }
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
      <div className='grid grid-cols-2 md:grid-cols-4 gap-2'>
        {!!data.length &&
          data?.map((item: any) => (
            <div
              key={'employee-' + item.id}
              className='bg-white w-full h-fit pb-3 px-3 pt-6 flex flex-col items-center border border-line hover:shadow-lg'
            >
              <img
                src={item.photo}
                className='w-20 h-20 rounded-full border'
              ></img>
              <p className='mt-4 text-dark'>{item.fullname}</p>
              <div className='mt-6 grid grid-cols-2 gap-3.5 w-full'>
                <button
                  className={cn(
                    'border py-3 border-line flex justify-center items-center gap-2 w-full flex-nowrap',
                    item.attendances.length &&
                      item.attendances[0].type == 'presence' &&
                      'bg-green-primary border-green-primary text-white'
                  )}
                  onClick={() => {
                    mutate({
                      date:
                        url.date !== ''
                          ? url.date
                          : format(new Date(), 'dd-MM-yyyy'),
                      employeeId: item.id,
                      total_hour: 1,
                      type: 'presence',
                    })
                  }}
                >
                  <CheckIcon
                    className={cn(
                      'w-4 h-4 text-green-primary stroke-[3px]',
                      item.attendances.length &&
                        item.attendances[0].type == 'presence' &&
                        ' text-white'
                    )}
                  />
                  <p
                    className={cn(
                      'text-dark text-sm',
                      item.attendances.length &&
                        item.attendances[0].type == 'presence' &&
                        ' text-white'
                    )}
                  >
                    Hadir
                  </p>
                </button>
                <button
                  className={cn(
                    'border py-3 border-line flex justify-center items-center gap-2 w-full flex-nowrap',
                    item.attendances.length &&
                      item.attendances[0].type == 'absent' &&
                      'bg-[#C95F61] border-[#C95F61]'
                  )}
                  onClick={() => {
                    mutate({
                      date:
                        url.date !== ''
                          ? url.date
                          : format(new Date(), 'dd-MM-yyyy'),
                      employeeId: item.id,
                      total_hour: 0,
                      type: 'absent',
                    })
                  }}
                >
                  <XIcon
                    className={cn(
                      'w-4 h-4 text-[#C95F61] stroke-[3px]',
                      item.attendances.length &&
                        item.attendances[0].type == 'absent' &&
                        ' text-white'
                    )}
                  />
                  <p
                    className={cn(
                      'text-dark text-sm',
                      item.attendances.length &&
                        item.attendances[0].type == 'absent' &&
                        ' text-white'
                    )}
                  >
                    Tdk. Hadir
                  </p>
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}

export function Overtime() {
  const [url] = useUrlState({ name: '', date: '' })
  const { data, isLoading } = useOvertime({
    name: url.name,
    ...(url.date !== '' ? { date: format(url.date, 'yyyy-dd-MM') } : undefined),
  })

  return (
    <>
      <div className='flex justify-between items-center mb-4'>
        <div className='flex gap-4'>
          <div className='max-w-[180px]'>
            <Search />
          </div>
          <Filter />
        </div>
        <ModalAdd />
      </div>
      <DataTable
        columns={columnOvertime}
        data={data?.data?.data || []}
        withLoading
        isLoading={isLoading}
      />
    </>
  )
}

// OVERTIME
export function ModalAdd() {
  const [isOpen, setIsOpen] = useState(false)

  const { data: employees } = useEmployees({}, { enabled: isOpen })
  const { mutate } = useCreateOvertime()

  const form = useForm<OvertimeSchema>({
    resolver: zodResolver(overtimeSchema),
    defaultValues: {
      total_hour: 0,
      date: '',
      description: undefined,
    },
  })

  const submit = async (data: OvertimeSchema) => {
    mutate(
      {
        ...data,
        employeeId: Number(data.employeeId),
        date: new Date(format(data.date, 'yyyy-MM-dd')),
      },
      {
        onSuccess: async () => {
          setIsOpen(false)
        },
      }
    )
  }

  return (
    <>
      <Button className='h-8' onClick={() => setIsOpen(true)}>
        Tambah data
      </Button>
      <Modal title='Lemburan' open={isOpen} setOpen={setIsOpen}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(submit)}>
            <ModalContainer setOpen={setIsOpen}>
              <FormField
                control={form.control}
                name='employeeId'
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    value={field?.value?.toString()}
                  >
                    <SelectTrigger className='w-full rounded-xl shadow-sm shadow-gray-950/10 border border-[#DEE0E3]'>
                      <SelectValue placeholder='Pilih pegawai' />
                    </SelectTrigger>
                    <SelectContent>
                      {employees?.data?.data?.map(
                        (emp: Employee & { id: number }) => (
                          <SelectItem key={emp.id} value={emp?.id?.toString()}>
                            {emp.fullname}
                          </SelectItem>
                        )
                      )}
                    </SelectContent>
                  </Select>
                )}
              />
              <FormField
                control={form.control}
                name='date'
                render={({ field }) => (
                  <Input {...field} className='block' type='date' />
                )}
              />
              <FormField
                control={form.control}
                name='total_hour'
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
    </>
  )
}

// COLUMNS
const columnOvertime: ColumnDef<
  Employee & {
    id: number
    overtime?: { id: number; total_hour?: number; description?: string }[]
  }
>[] = [
  {
    accessorKey: 'fullname',
    header: 'Nama',
  },
  {
    id: 'jabatan',
    header: 'Jabatan',
    cell: ({ cell }) => {
      return <p>{cell.row.original?.position?.name}</p>
    },
  },
  {
    id: 'total_hour',
    header: 'Jumlah jam',
    cell: ({ cell }) => (
      <p>
        {!!cell.row.original.overtime?.length &&
          cell.row.original?.overtime[0]?.total_hour}
      </p>
    ),
  },
  {
    id: 'description',
    header: 'Keterangan',
    cell: ({ cell }) => (
      <p>
        {!!cell.row.original.overtime?.length &&
          cell.row.original?.overtime[0]?.description}
      </p>
    ),
  },
  {
    id: 'action',
    cell: () => (
      <div className='flex justify-end w-full'>
        <DropdownMenu>
          <DropdownMenuTrigger
            asChild
            className='border-transparent hover:border-gray-200'
          >
            <Button variant='outline' className='p-0 h-fit rounded px-0.5'>
              <Ellipsis className='w-6 h-6 text-[#313951]/70' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className='w-full right-0'></DropdownMenuContent>
        </DropdownMenu>
      </div>
    ),
  },
]

// const dataRegular: Employee[] = [
//   {
//     fullname: 'Mulyana',
//     position: {
//       id: 1,
//       name: 'Staf',
//     },
//   },
//   {
//     fullname: 'Widya syahrul rohmah💕',
//     position: {
//       id: 1,
//       name: 'Staf',
//     },
//   },
// ]

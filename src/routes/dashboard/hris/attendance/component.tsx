import { addDays, format, isValid, subDays, parse, isToday } from 'date-fns'
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Ellipsis,
  TriangleAlert,
  X,
} from 'lucide-react'
import useUrlState from '@ahooksjs/use-url-state'
import { Button } from '@/components/ui/button'
import { id } from 'date-fns/locale'
import { useState } from 'react'
import Search from '@/components/common/search'
import Filter from '@/components/common/filter'
import { ColumnDef } from '@tanstack/react-table'
import { cn } from '@/utils/cn'
import { DataTable } from '@/components/data-table'
import { Overtime as OvertimeType } from '@/utils/types/overtime'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  useAttendances,
  useCreateAttendance,
  useUpdateAttendance,
} from '@/hooks/use-attendance'
import { Employee } from '@/utils/types/employee'

type AttendanceType = 'presence' | 'absent' | 'leave' | 'not_yet'

export function Header() {
  const [url, setUrl] = useUrlState({ date: '' })
  const [currDate, setCurrDate] = useState(() => {
    if (url.date && url.date !== '') {
      const parsedDate = parse(url.date, 'dd-MM-yyyy', new Date())
      if (isValid(parsedDate)) {
        return parsedDate
      } else {
        console.warn(
          `Invalid date format: ${url.date}. Using current date instead.`
        )
        return new Date()
      }
    }
    return new Date()
  })

  const formatDate = (date: Date): string => {
    return format(date, 'dd MMMM yyyy', { locale: id })
  }

  const formatDay = (date: Date): string => {
    return format(date, 'EEEE', { locale: id })
  }

  const nextDate = () => {
    setCurrDate((prev) => addDays(prev, 1))
    setUrl({ date: format(addDays(currDate, 1), 'dd-MM-yyy') })
  }

  const prevDate = () => {
    setCurrDate((prev) => subDays(prev, 1))
    setUrl({ date: format(subDays(currDate, 1), 'dd-MM-yyyy') })
  }

  return (
    <div className='flex justify-between items-center'>
      <div>
        <div className='flex'>
          <p className='text-lg text-[#021328] font-medium'>
            {formatDay(currDate)},{' '}
            <span className='opacity-50'>{formatDate(currDate)}</span>
          </p>
        </div>
      </div>
      <div>
        <Button variant='ghost' onClick={prevDate}>
          <ChevronLeft className='w-4 h-4' />
        </Button>
        <Button variant='ghost' onClick={nextDate} disabled={isToday(currDate)}>
          <ChevronRight className='w-4 h-4' />
        </Button>
      </div>
    </div>
  )
}

export function Regular() {
  const [url] = useUrlState({ name: '', date: '' })
  const { data, isLoading } = useAttendances({
    name: url.name,
    ...(url.date !== '' ? { date: url.date } : undefined),
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
      </div>
      <DataTable
        columns={columnsRegular}
        data={data?.data?.data || []}
        withLoading
        isLoading={isLoading}
      />
    </>
  )
}

export function Overtime() {
  return (
    <>
      <div className='flex justify-between items-center mb-4'>
        <div className='flex gap-4'>
          <div className='max-w-[180px]'>
            <Search />
          </div>
          <Filter />
        </div>
      </div>
      <DataTable columns={columnOvertime} data={dataOvertime} />
    </>
  )
}

const useAttendanceActions = (employeeId: number, id?: number) => {
  const { mutate: create } = useCreateAttendance()
  const { mutate: update } = useUpdateAttendance()
  const [url] = useUrlState({ date: '' })

  const createAttendance = (
    type: AttendanceType,
    mode: 'create' | 'update',
    total_hour?: number
  ) => {
    const date = url.date !== '' ? new Date(url.date) : new Date()

    if (mode === 'update') {
      if (!id) return

      update({
        id: id,
        payload: {
          date: date.toISOString(),
          total_hour: total_hour || 0,
          type,
        },
      })
      return
    }

    create({
      date: date.toISOString(),
      employeeId,
      total_hour: total_hour || 0,
      type,
    })
  }

  return {
    onPresence: (total_hour: number) =>
      createAttendance('presence', 'create', total_hour),
    onAbsent: () => createAttendance('absent', 'create'),
    onLeave: () => createAttendance('leave', 'create'),
    onUpdate: (type: 'presence' | 'absent' | 'leave', total_hour: number) =>
      createAttendance(type, 'update', total_hour),
  }
}

type AttendanceButtonProps = {
  type: AttendanceType
  onClick: () => void
  children: React.ReactNode
  currentAttendance: AttendanceType
}
const AttendanceButton = ({
  type,
  onClick,
  children,
  currentAttendance,
}: AttendanceButtonProps) => (
  <Button
    className={cn(
      'p-0 h-7 w-7 rounded-full border border-[#EFF0F2] bg-[#F9FAFB] text-[#747C94]',
      type === 'presence' &&
        currentAttendance === 'presence' &&
        'bg-green-600 disabled:bg-emerald-600 disabled:border-emerald-900 text-white',
      type === 'absent' &&
        currentAttendance === 'absent' &&
        'bg-red-600 text-white disabled:bg-red-700 disabled:border-red-900',
      type === 'leave' &&
        currentAttendance === 'leave' &&
        'bg-amber-500 text-white disabled:bg-amber-700 disabled:border-amber-900'
    )}
    variant='ghost'
    disabled={currentAttendance === type}
    onClick={onClick}
  >
    {children}
  </Button>
)

const columnsRegular: ColumnDef<
  Employee & { id: number; attendances?: { id: number }[] }
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
    id: 'Status',
    header: () => <div className='flex justify-end pr-24'>Status</div>,
    cell: ({ row }) => {
      const attendance = (
        !!row.original.attendances?.length
          ? row.original?.attendances[0]?.type
          : 'not_yet'
      ) as AttendanceType

      const { onPresence, onAbsent, onLeave, onUpdate } = useAttendanceActions(
        row.original.id,
        !!row.original.attendances?.length
          ? row.original.attendances[0].id
          : undefined
      )

      return (
        <div className='flex justify-end gap-4 items-center'>
          <AttendanceButton
            type='presence'
            currentAttendance={attendance}
            onClick={() => {
              attendance == 'not_yet' ? onPresence(1) : onUpdate('presence', 1)
            }}
          >
            <Check className='w-4 h-4' />
          </AttendanceButton>
          <AttendanceButton
            type='absent'
            currentAttendance={attendance}
            onClick={() => {
              attendance == 'not_yet' ? onAbsent() : onUpdate('absent', 0)
            }}
          >
            <X className='w-4 h-4' />
          </AttendanceButton>
          <AttendanceButton
            type='leave'
            currentAttendance={attendance}
            onClick={() => {
              attendance == 'not_yet' ? onLeave() : onUpdate('leave', 0)
            }}
          >
            <TriangleAlert className='w-4 h-4' />
          </AttendanceButton>
        </div>
      )
    },
  },
]

const columnOvertime: ColumnDef<OvertimeType>[] = [
  {
    id: 'nama',
    header: 'Nama',
    cell: ({ cell }) => {
      return <p>{cell.row.original.employee?.fullname}</p>
    },
  },
  {
    id: 'jabatan',
    header: 'Jabatan',
    cell: ({ cell }) => {
      return <p>{cell.row.original.employee?.position?.name}</p>
    },
  },
  {
    accessorKey: 'total_hour',
    header: 'Jumlah jam',
  },
  {
    accessorKey: 'description',
    header: 'Deskripsi',
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
const dataOvertime: OvertimeType[] = [
  {
    id: 1,
    employeeId: 1,
    date: '2024-08-27',
    employee: {
      fullname: 'Mulyana',
      position: {
        id: 1,
        name: 'Staf',
      },
    },
    total_hour: 1,
  },
  {
    id: 1,
    employeeId: 1,
    date: '2024-08-27',
    employee: {
      fullname: 'Widya syahrul rohmah',
      position: {
        id: 1,
        name: 'Staf',
      },
    },
    total_hour: 2,
  },
]

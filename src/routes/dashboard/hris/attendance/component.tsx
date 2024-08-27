import { addDays, format, isValid, subDays, parse, isToday } from 'date-fns'
import { ChevronLeft, ChevronRight, Ellipsis } from 'lucide-react'
import useUrlState from '@ahooksjs/use-url-state'
import { Button } from '@/components/ui/button'
import { id } from 'date-fns/locale'
import { useState } from 'react'
import Search from '@/components/common/search'
import Filter from '@/components/common/filter'
import { ColumnDef } from '@tanstack/react-table'
import { Attendance } from '@/utils/types/attendance'
import { cn } from '@/utils/cn'
import { DataTable } from '@/components/data-table'
import { Overtime as OvertimeType } from '@/utils/types/overtime'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

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
      <DataTable columns={columnsRegular} data={dataRegular} />
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

const columnsRegular: ColumnDef<Attendance>[] = [
  {
    id: 'nama',
    header: 'Nama',
    cell: ({ cell }) => {
      return <p>{cell.row.original.employee.fullname}</p>
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
    id: 'Status',
    header: () => <div className='flex justify-end pr-24'>Status</div>,
    cell: () => {
      return (
        <div className='flex justify-end gap-4 items-center'>
          <Button
            className={cn(
              'w-7 h-8 rounded-full border border-[#EFF0F2] bg-[#F9FAFB] text-[#747C94]'
            )}
            variant='ghost'
          >
            H
          </Button>
          <Button
            className={cn(
              'w-7 h-8 rounded-full border border-[#EFF0F2] bg-[#F9FAFB] text-[#747C94]'
            )}
            variant='ghost'
          >
            A
          </Button>
          <Button
            className={cn(
              'w-7 h-8 rounded-full border border-[#EFF0F2] bg-[#F9FAFB] text-[#747C94]'
            )}
            variant='ghost'
          >
            I
          </Button>
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
      return <p>{cell.row.original.employee.fullname}</p>
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

const dataRegular: Attendance[] = [
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
    total_hour: 1,
  },
]
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

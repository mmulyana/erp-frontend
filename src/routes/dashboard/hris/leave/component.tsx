import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Leave } from '@/utils/types/leave'
import { ColumnDef } from '@tanstack/react-table'
import { intervalToDuration } from 'date-fns'
import { Ellipsis } from 'lucide-react'

export const columns: ColumnDef<Leave>[] = [
  {
    id: 'nama',
    header: 'Nama',
    cell: ({ cell }) => {
      return <p>{cell.row.original.employee.fullname}</p>
    },
  },
  {
    accessorKey: 'leaveType',
    header: 'Tipe',
  },
  {
    accessorKey: 'startDate',
    header: 'Dari tanggal',
  },
  {
    accessorKey: 'endDate',
    header: 'Sampai tanggal',
  },
  {
    id: 'duration',
    header: 'Durasi',
    cell: ({ row }) => {
      const { days } = intervalToDuration({
        start: new Date(row.original.startDate),
        end: new Date(row.original.endDate),
      })
      return <p>{days}</p>
    },
  },
  {
    accessorKey: 'description',
    header: 'Keterangan',
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

export const data: Leave[] = [
  {
    id: 1,
    employeeId: 1,
    employee: {
      fullname: 'mulyana',
    },
    startDate: '2024-09-01',
    endDate: '2024-09-12',
    leaveType: 'sakit',
  },
]

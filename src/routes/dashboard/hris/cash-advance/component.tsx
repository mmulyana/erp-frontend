import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { CashAdvance } from '@/utils/types/cash-advance'
import { ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'
import { id } from 'date-fns/locale'
import { Ellipsis } from 'lucide-react'

export const columns: ColumnDef<CashAdvance>[] = [
  {
    id: 'nama',
    header: 'Nama',
    cell: ({ cell }) => {
      return <p>{cell.row.original.employee.fullname}</p>
    },
  },
  {
    accessorKey: 'amount',
    header: 'Jumlah',
    cell: ({ cell }) => {
      return <p>Rp {cell.row.original.amount}</p>
    },
  },
  {
    accessorKey: 'requestDate',
    header: 'Tanggal',
    cell: ({ cell }) => {
      return (
        <p>
          {format(cell.row.original.requestDate, 'EEEE, dd/MM/yy', {
            locale: id,
          })}
        </p>
      )
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

export const data: CashAdvance[] = [
  {
    id: 1,
    amount: 500000,
    employee: {
      fullname: 'Mulyana',
    },
    employeeId: 1,
    requestDate: '2024-08-27',
    description: '',
  },
  {
    id: 1,
    amount: 240000,
    employee: {
      fullname: 'Ikmal',
    },
    employeeId: 1,
    requestDate: '2024-08-27',
    description: '',
  },
  {
    id: 1,
    amount: 340000,
    employee: {
      fullname: 'Kelvin',
    },
    employeeId: 1,
    requestDate: '2024-08-27',
    description: '',
  },
]

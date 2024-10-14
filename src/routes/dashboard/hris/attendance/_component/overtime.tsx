import Filter from '@/components/common/filter'
import Search from '@/components/common/search'
import { DataTable } from '@/components/data-table'
import { Button } from '@/components/ui/button'
import {
  DropdownMenuGroup,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu'
import { useOvertime } from '@/hooks/api/use-overtime'
import { Employee } from '@/utils/types/api'
import useUrlState from '@ahooksjs/use-url-state'
import { ColumnDef } from '@tanstack/react-table'
import { format, parse } from 'date-fns'
import { CalendarDaysIcon, PencilIcon, TrashIcon } from 'lucide-react'
import { AddOvertime } from './add-overtime'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/utils/cn'
import { id } from 'date-fns/locale'
import { Calendar } from '@/components/ui/calendar'
import DropdownEdit from '@/components/common/dropdown-edit'

export function Overtime() {
  const [url, setUrl] = useUrlState({ name: '', date: '' })
  const { data, isLoading } = useOvertime({
    name: url.name,
    ...(url.date !== ''
      ? {
          date: format(parse(url.date, 'dd-MM-yyyy', new Date()), 'dd-MM-yyyy'),
        }
      : undefined),
  })

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
          <DropdownEdit className='-translate-x-3'>
            <DropdownMenuGroup>
              <DropdownMenuItem className='flex items-center gap-2 cursor-pointer'>
                <PencilIcon className='w-3.5 h-3.5 text-dark/50' />
                Ubah
              </DropdownMenuItem>
              <DropdownMenuItem className='flex items-center gap-2 cursor-pointer'>
                <TrashIcon className='w-3.5 h-3.5 text-dark/50' />
                Hapus
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownEdit>
        </div>
      ),
    },
  ]

  return (
    <div>
      <div className='flex justify-between items-center p-4 bg-[#F9FAFB]'>
        <div className='flex gap-4'>
          <Search />
          <Filter />
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={'outline'}
                className={cn(
                  'w-fit pl-3 gap-2 text-left font-normal text-dark'
                )}
              >
                <CalendarDaysIcon className='h-4 w-4 text-[#2A9D90]' />
                {url.date ? (
                  format(
                    parse(url.date, 'dd-MM-yyyy', new Date()),
                    'EEEE, dd MMM yyyy',
                    {
                      locale: id,
                    }
                  )
                ) : (
                  <span>Pilih tanggal</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className='w-auto p-0' align='start'>
              <Calendar
                mode='single'
                selected={
                  url.date
                    ? parse(url.date, 'dd-MM-yyyy', new Date())
                    : undefined
                }
                onSelect={(val) => {
                  const originalDate = new Date(val as Date)
                  const formattedDate = format(originalDate, 'dd-MM-yyyy')
                  setUrl((prev) => ({ ...prev, date: formattedDate }))
                }}
                disabled={(date) =>
                  date > new Date() || date < new Date('2024-01-01')
                }
              />
            </PopoverContent>
          </Popover>
        </div>
        <AddOvertime />
      </div>
      <DataTable
        columns={columnOvertime}
        data={data?.data?.data || []}
        withLoading
        isLoading={isLoading}
      />
    </div>
  )
}

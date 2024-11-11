import Filter from '@/components/common/filter'
import Search from '@/components/common/search'
import { DataTable } from '@/components/data-table'
import { Button } from '@/components/ui/button'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import {
  useDeleteOvertime,
  useOvertimePagination,
} from '@/hooks/api/use-overtime'
import { Overtime as TOvertime } from '@/utils/types/api'
import useUrlState from '@ahooksjs/use-url-state'
import { ColumnDef } from '@tanstack/react-table'
import { format, parse } from 'date-fns'
import { CalendarDaysIcon, X } from 'lucide-react'
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
import { useApiData } from '@/hooks/use-api-data'
import { useState } from 'react'

export function Overtime() {
  const { mutate: remove } = useDeleteOvertime()

  const [url, setUrl] = useUrlState({ name: '', date: '', page: '' })
  const { data, isLoading } = useApiData(
    useOvertimePagination({
      ...(url.name !== '' ? { fullname: url.name } : undefined),
      ...(url.page !== '' ? { page: url.page } : undefined),
      ...(url.date !== ''
        ? {
            date: url.date,
          }
        : undefined),
    })
  )

  // COLUMNS
  const columnOvertime: ColumnDef<TOvertime>[] = [
    {
      accessorKey: 'fullname',
      header: 'Nama',
      cell: ({ cell }) => {
        return <p>{cell.row.original.employee.fullname}</p>
      },
    },
    {
      id: 'jabatan',
      header: 'Jabatan',
      cell: ({ cell }) => {
        return <p>{cell.row.original.employee.position?.name}</p>
      },
    },
    {
      id: 'total_hour',
      header: () => <p className='text-center'>Jumlah jam</p>,
      cell: ({ cell }) => (
        <p className='text-center'>{cell.row.original.total_hour}</p>
      ),
    },
    {
      id: 'date',
      header: 'Tanggal',
      cell: ({ cell }) => (
        <p>
          {format(cell.row.original.date, 'EEEE, dd MMM yyyy', { locale: id })}
        </p>
      ),
    },
    {
      id: 'description',
      header: 'Keterangan',
      cell: ({ cell }) => <p>{cell.row.original.description}</p>,
    },
    {
      id: 'action',
      cell: ({ row }) => (
        <div className='flex justify-end w-full'>
          <DropdownEdit className='-translate-x-3'>
            <DropdownMenuItem
              className='flex items-center gap-2 cursor-pointer'
              onClick={() => setDialog({ open: true, id: row.original.id })}
            >
              Ubah
            </DropdownMenuItem>
            <DropdownMenuItem
              className='flex items-center gap-2 cursor-pointer'
              onClick={() => remove({ id: row.original.id })}
            >
              Hapus
            </DropdownMenuItem>
          </DropdownEdit>
        </div>
      ),
    },
  ]

  const [dialog, setDialog] = useState<{
    open: boolean
    id: number | null
  } | null>(null)
  
  return (
    <>
      <div className='flex justify-between items-center p-4 bg-[#F9FAFB]'>
        <div className='flex gap-4'>
          <Search />
          <Filter />
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant='outline'
                className={cn(
                  'w-fit pl-3 gap-2 text-left font-normal text-dark'
                )}
              >
                <CalendarDaysIcon className='h-4 w-4 text-[#2A9D90]' />
                {url.date ? (
                  format(
                    parse(url.date, 'yyyy-MM-dd', new Date()),
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
                    ? parse(url.date, 'yyyy-MM-dd', new Date())
                    : undefined
                }
                onSelect={(val) => {
                  if (val) {
                    const formattedDate = format(val, 'yyyy-MM-dd')
                    setUrl((prev) => ({ ...prev, date: formattedDate }))
                  }
                }}
                disabled={(date) =>
                  date > new Date() || date < new Date('2024-01-01')
                }
              />
            </PopoverContent>
          </Popover>
          {(url.date !== '' || url.name !== '') && (
            <Button
              variant='ghost'
              className='font-normal flex items-center gap-1 relative pl-3 pr-6'
              onClick={() => {
                setUrl({ date: undefined, name: undefined })
              }}
            >
              Hapus filter
              <X
                size={14}
                className='text-red-primary/80 absolute top-[55%] right-1.5 -translate-y-1/2'
              />
            </Button>
          )}
        </div>
        <Button onClick={() => setDialog({ open: true, id: null })}>
          Tambah Data
        </Button>
      </div>
      <DataTable
        columns={columnOvertime}
        data={data?.data || []}
        isLoading={isLoading}
        totalPages={data?.total_pages}
        withPagination
      />
      <AddOvertime
        open={dialog?.open || false}
        setOpen={() => setDialog(null)}
        id={dialog?.id}
      />
    </>
  )
}

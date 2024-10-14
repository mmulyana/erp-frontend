import Filter from '@/components/common/filter'
import Search from '@/components/common/search'
import { DataTable } from '@/components/data-table'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useOvertime } from '@/hooks/api/use-overtime'
import { Employee } from '@/utils/types/api'
import useUrlState from '@ahooksjs/use-url-state'
import { ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'
import { Ellipsis } from 'lucide-react'
import { AddOvertime } from './add-overtime'

export function Overtime() {
  const [url] = useUrlState({ name: '', date: '' })
  const { data, isLoading } = useOvertime({
    name: url.name,
    ...(url.date !== '' ? { date: format(url.date, 'yyyy-dd-MM') } : undefined),
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

  return (
    <>
      <div className='flex justify-between items-center mb-4'>
        <div className='flex gap-4'>
          <div className='max-w-[180px]'>
            <Search />
          </div>
          <Filter />
        </div>
        <AddOvertime />
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

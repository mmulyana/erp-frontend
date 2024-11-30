import useUrlState from '@ahooksjs/use-url-state'
import { ColumnDef } from '@tanstack/react-table'
import { id } from 'date-fns/locale'
import { format } from 'date-fns'
import { useState } from 'react'

import {
  useDeleteOvertime,
  useOvertimePagination,
} from '@/hooks/api/use-overtime'
import useTour from '@/hooks/use-tour'
import { useApiData } from '@/hooks/use-api-data'

import { Overtime as TOvertime } from '@/utils/types/api'
import { TEST_ID } from '@/utils/constant/_testId'

import DropdownEdit from '@/components/common/dropdown-edit'
import ProtectedComponent from '@/components/protected'
import Search from '@/components/common/search'
import Tour from '@/components/common/tour'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { DataTable } from '@/components/data-table'
import { Button } from '@/components/ui/button'

import FilterReset from './filter-reset'
import FilterDate from './filter-date'
import { AddOvertime } from './add-overtime'
import { steps } from './tour-overtime'

export function Overtime() {
  const { mutate: remove } = useDeleteOvertime()

  const [url] = useUrlState({ name: '', date: '', page: '' })
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
        <div className='w-[72px]'>
          <p className='text-center'>{cell.row.original.total_hour}</p>
        </div>
      ),
    },
    {
      id: 'date',
      header: 'Tanggal',
      cell: ({ cell }) => (
        <div className='w-[88px]'>
          <p>
            {format(cell.row.original.date, 'dd MMM yyyy', {
              locale: id,
            })}
          </p>
        </div>
      ),
    },
    {
      id: 'description',
      header: 'Keterangan',
      cell: ({ cell }) => (
        <div className='w-[200px]'>
          <p>{cell.row.original.description}</p>
        </div>
      ),
    },
    {
      id: 'action',
      cell: ({ row }) => (
        <div className='flex justify-end w-full'>
          <DropdownEdit className='-translate-x-3'>
            <ProtectedComponent required={['overtime:update']}>
              <DropdownMenuItem
                className='flex items-center gap-2 cursor-pointer'
                onClick={() => setDialog({ open: true, id: row.original.id })}
              >
                Ubah
              </DropdownMenuItem>
            </ProtectedComponent>
            <ProtectedComponent required={['overtime:delete']}>
              <DropdownMenuItem
                className='flex items-center gap-2 cursor-pointer'
                onClick={() => remove({ id: row.original.id })}
              >
                Hapus
              </DropdownMenuItem>
            </ProtectedComponent>
          </DropdownEdit>
        </div>
      ),
    },
  ]

  const [dialog, setDialog] = useState<{
    open: boolean
    id: number | null
  } | null>(null)

  const { start, onTourEnd } = useTour('overtime')

  return (
    <>
      <div className='flex justify-between items-start p-4 bg-[#F9FAFB] gap-2'>
        <div className='flex gap-4 flex-wrap'>
          <Search />
          <FilterDate />
          <FilterReset />
        </div>
        <ProtectedComponent required={['overtime:create']}>
          <Button
            onClick={() => setDialog({ open: true, id: null })}
            id={TEST_ID.BUTTON_ADD_OVERTIME}
            data-testid={TEST_ID.BUTTON_ADD_OVERTIME}
          >
            Tambah
          </Button>
        </ProtectedComponent>
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

      <Tour steps={steps} start={start} onTourEnd={onTourEnd} />
    </>
  )
}

import { ColumnDef } from '@tanstack/react-table'
import { Link } from 'react-router-dom'
import { useAtomValue } from 'jotai'
import { format } from 'date-fns'
import { useState } from 'react'

import { useDeleteRecap, useRecapPagination } from '@/hooks/api/use-recap'
import { useApiData } from '@/hooks/use-api-data'

import { permissionAtom } from '@/shared/store/permission'
import { createLinkDetail } from '@/utils/create-link-detail'
import { TEST_ID } from '@/utils/constant/_testId'
import { PATH } from '@/utils/constant/_paths'
import { Recap } from '@/utils/types/api'
import { cn } from '@/utils/cn'

import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { Button, buttonVariants } from '@/components/ui/button'
import { DataTable } from '@/components/data-table'

import AlertDialogV1 from '@/components/common/alert-dialog-v1'
import DropdownEdit from '@/components/common/dropdown-edit'
import ProtectedComponent from '@/components/protected'
import Overlay from '@/components/common/overlay'
import Search from '@/components/common/search'
import Tour from '@/components/common/tour'

import { Eye } from 'lucide-react'

import { DashboardLayout } from '../../../../shared/component/layout'
import { useTitle } from '../../../../shared/component/header'
import { AddRecap } from './_component/add-recap'
import { steps } from './_component/tour-index'
import useTour from '@/hooks/use-tour'

const links = [
  {
    name: 'Dashboard',
    path: PATH.DASHBOARD_OVERVIEW,
  },
  {
    name: 'Rekapan',
    path: PATH.EMPLOYEE_RECAP,
  },
]

export default function Report() {
  useTitle(links)

  const permission = useAtomValue(permissionAtom)

  const { mutate: remove } = useDeleteRecap()

  const { data, isLoading } = useApiData(useRecapPagination())

  const columns: ColumnDef<Recap>[] = [
    {
      id: 'name',
      accessorKey: 'name',
      header: 'Periode',
      cell: ({ row }) => {
        const isAllowed = permission.includes('recap:detail')
        return (
          <Overlay
            className='w-fit pr-14'
            overlay={
              isAllowed && (
                <Link
                  to={createLinkDetail(
                    PATH.EMPLOYEE_RECAP_REPORT,
                    row.original.name,
                    row.original.id
                  )}
                  className='absolute right-0 top-1/2 -translate-y-1/2 text-sm text-[#313951] py-1 px-2 rounded-[6px] border border-[#EFF0F2] bg-white hover:shadow-sm hover:shadow-gray-200'
                >
                  Lihat
                </Link>
              )
            }
          >
            <div className='hover:text-dark'>
              {isAllowed ? (
                <Link
                  to={createLinkDetail(
                    PATH.EMPLOYEE_RECAP_REPORT,
                    row.original.name,
                    row.original.id
                  )}
                  className='break-words max-w-[120px] text-left'
                >
                  {row.original.name}
                </Link>
              ) : (
                <p className='break-words max-w-[120px] text-left'>
                  {row.original.name}
                </p>
              )}
            </div>
          </Overlay>
        )
      },
    },
    {
      id: 'start_date',
      header: 'tanggal mulai',
      cell: ({ row }) => (
        <div className='w-[88px]'>
          <p>{format(row.original.start_date, 'd MMM yyyy')}</p>
        </div>
      ),
    },
    {
      id: 'end_date',
      header: 'tanggal akhir',
      cell: ({ row }) => (
        <div className='w-[88px]'>
          <p>{format(row.original.end_date, 'd MMM yyyy')}</p>
        </div>
      ),
    },
    {
      id: 'action',
      cell: ({ row }) => (
        <div className='flex gap-4 items-center'>
          <ProtectedComponent required={['recap:detail']}>
            <Link
              className={cn(
                buttonVariants({ variant: 'default' }),
                'gap-2 pl-3 pr-2.5'
              )}
              to={createLinkDetail(
                PATH.EMPLOYEE_RECAP_REPORT,
                row.original.name,
                row.original.id
              )}
            >
              Lihat Laporan <Eye size={16} />
            </Link>
          </ProtectedComponent>
          <ProtectedComponent required={['recap:update', 'recap:delete']}>
            <DropdownEdit>
              <ProtectedComponent required={['recap:update']}>
                <DropdownMenuItem
                  onClick={() => setDialog({ id: row.original.id, open: true })}
                >
                  Edit
                </DropdownMenuItem>
              </ProtectedComponent>
              <ProtectedComponent required={['recap:delete']}>
                <DropdownMenuItem
                  onClick={() =>
                    setDeleteDialog({ id: row.original.id, open: true })
                  }
                >
                  Hapus
                </DropdownMenuItem>
              </ProtectedComponent>
            </DropdownEdit>
          </ProtectedComponent>
        </div>
      ),
    },
  ]

  const [dialog, setDialog] = useState<{
    id: number | null
    open: boolean
  } | null>(null)

  const [deleteDialog, setDeleteDialog] = useState<{
    id: number
    open: boolean
  } | null>(null)

  const { start, onTourEnd } = useTour('recap')

  return (
    <DashboardLayout className='overflow-hidden'>
      <div className='flex gap-4 items-center justify-between p-4'>
        <div className='flex gap-4'>
          <Search />
        </div>
        <ProtectedComponent required={['recap:create']}>
          <Button
            variant='secondary'
            onClick={() => setDialog({ open: true, id: null })}
            id={TEST_ID.BUTTON_ADD_RECAP}
            data-testid={TEST_ID.BUTTON_ADD_RECAP}
          >
            Buat Periode
          </Button>
        </ProtectedComponent>
      </div>
      <DataTable
        columns={columns}
        data={data?.data || []}
        isLoading={isLoading}
        totalPages={data?.total_pages}
        withPagination
      />
      <AlertDialogV1
        open={deleteDialog?.open}
        setOpen={() => setDeleteDialog(null)}
        title='Hati-hati! Tindakan ini tidak bisa dibatalkan'
        body='Data periode akan dihapus dalam sistem tapi data presensi dan lain-lain tetap disimpan'
        onConfirm={() => {
          if (!deleteDialog?.id) return
          remove(
            { id: deleteDialog?.id },
            { onSuccess: () => setDeleteDialog(null) }
          )
        }}
      />
      <AddRecap
        id={dialog?.id}
        open={!!dialog?.open}
        setOpen={() => setDialog(null)}
      />

      <Tour steps={steps} start={start} onTourEnd={onTourEnd} />
    </DashboardLayout>
  )
}

import { ColumnDef } from '@tanstack/react-table'
import { DashboardLayout } from '../_component/layout'
import { User } from '@/utils/types/api'
import { DataTable } from '@/components/data-table'
import { useApiData } from '@/hooks/use-api-data'
import { useAccountPagination, useResetPassword } from '@/hooks/api/use-account'
import { Button } from '@/components/ui/button'
import { FilterTable, HeadTable } from '@/components/data-table/component'
import { UserCircle } from 'lucide-react'
import { BASE_URL } from '@/utils/constant/_urls'
import DropdownEdit from '@/components/common/dropdown-edit'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { PATH } from '@/utils/constant/_paths'
import { useTitle } from '../_component/header'
import { useState } from 'react'
import AlertDialogV1 from '@/components/common/alert-dialog-v1'
import AddUser from './_component.ts/add-user'
import useUrlState from '@ahooksjs/use-url-state'

const LINKS = [
  { name: 'Dashboard', path: PATH.DASHBOARD_OVERVIEW },
  { name: 'Admin', path: PATH.ADMIN_USER },
]

export default function Index() {
  useTitle(LINKS)

  // HANDLE RESET PASSWORD
  const { mutate: reset } = useResetPassword()
  const [resetPassword, setResetPassword] = useState<{
    id: number
    name: string
    open: boolean
  } | null>(null)

  // HANDLE DIALOG NEW USER
  const [open, setOpen] = useState(false)

  const [url] = useUrlState({ page: '' })
  const { data: users, isLoading } = useApiData(
    useAccountPagination({ page: url.page })
  )
  const column: ColumnDef<User>[] = [
    {
      id: 'name',
      accessorKey: 'name',
      header: 'Name',
      cell: ({ row }) => (
        <div className='flex gap-2 items-center'>
          {row.original.photo ? (
            <img
              src={BASE_URL + '/img/' + row.original.photo}
              className='w-6 h-6 rounded-full flex-shrink-0'
            />
          ) : (
            <div className='w-6 h-6 rounded-full flex-shrink-0 bg-blue-primary/5 flex items-center justify-center'>
              <p className='text-blue-primary leading-none uppercase font-medium'>
                {row.original.name.at(0)}
              </p>
            </div>
          )}
          <p className='text-dark'>{row.original.name}</p>
        </div>
      ),
    },
    {
      id: 'date_created',
      header: 'Tanggal dibuat',
    },
    {
      id: 'role',
      header: 'Akses',
      cell: ({ row }) => <p>{row.original.role.name}</p>,
    },
    {
      id: 'action',
      cell: ({ row }) => (
        <div className='flex justify-end items-center gap-4'>
          <Button
            variant='outline'
            onClick={() =>
              setResetPassword({
                id: row.original.id,
                name: row.original.name,
                open: true,
              })
            }
          >
            Reset Password
          </Button>
          <DropdownEdit>
            <DropdownMenuItem>Hak istimewa</DropdownMenuItem>
            <DropdownMenuItem>Nonaktifkan</DropdownMenuItem>
            <DropdownMenuItem>Hapus</DropdownMenuItem>
          </DropdownEdit>
        </div>
      ),
    },
  ]

  return (
    <DashboardLayout>
      <HeadTable>
        <div className='flex gap-4 items-center'>
          <UserCircle className='text-[#989CA8]' />
          <p className='text-dark font-medium'>User</p>
        </div>
        <Button onClick={() => setOpen(!open)}>User Baru</Button>
      </HeadTable>
      <FilterTable />
      <DataTable
        columns={column}
        data={users?.data || []}
        isLoading={isLoading}
        withPagination
        totalPages={users?.total_pages}
      />
      <AlertDialogV1
        open={resetPassword?.open || false}
        setOpen={() => setResetPassword(null)}
        body={`Akun milik ${resetPassword?.name} akan direset ulang, password baru: "password"`}
        title='Reset Password'
        className='bg-blue-primary'
        onConfirm={() => resetPassword?.id && reset({ id: resetPassword?.id })}
      />
      <AddUser open={open} setOpen={setOpen} />
    </DashboardLayout>
  )
}

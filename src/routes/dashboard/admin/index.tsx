import { ColumnDef } from '@tanstack/react-table'
import useUrlState from '@ahooksjs/use-url-state'
import { useAtomValue } from 'jotai'
import { useState } from 'react'

import { userAtom } from '@/atom/auth'
import { formatPhone } from '@/utils/format-phone'
import { BASE_URL } from '@/utils/constant/_urls'
import { PATH } from '@/utils/constant/_paths'
import { User } from '@/utils/types/api'
import { useApiData } from '@/hooks/use-api-data'
import {
  useAccountPagination,
  useActiveAccount,
  useDeactiveAccount,
  useDeleteAccount,
  useResetPassword,
} from '@/hooks/api/use-account'

import { FilterTable, HeadTable } from '@/components/data-table/component'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import AlertDialogV1 from '@/components/common/alert-dialog-v1'
import DropdownEdit from '@/components/common/dropdown-edit'
import { DataTable } from '@/components/data-table'
import { Button } from '@/components/ui/button'
import Chips from '@/components/common/chips'

import AddUserRole from './_component.ts/add-user-role'
import { DashboardLayout } from '../_component/layout'
import { useTitle } from '../_component/header'
import AddUser from './_component.ts/add-user'

import { UserCircle } from 'lucide-react'

const LINKS = [
  { name: 'Dashboard', path: PATH.DASHBOARD_OVERVIEW },
  { name: 'Admin', path: PATH.ADMIN_USER },
]

export default function Index() {
  useTitle(LINKS)

  const { mutate: activate } = useActiveAccount()
  const { mutate: deactivate } = useDeactiveAccount()

  // HANDLE DELETE
  const [openDelete, setOpenDelete] = useState<{
    id: number | null
    open: boolean
  }>({ id: null, open: false })
  const { mutate: remove } = useDeleteAccount()

  // HANDLE RESET PASSWORD
  const { mutate: reset } = useResetPassword()
  const [resetPassword, setResetPassword] = useState<{
    id: number
    name: string
    open: boolean
  } | null>(null)

  // HANDLE DIALOG NEW USER
  const [dialog, setDialog] = useState<{
    id: number | null
    open: boolean
  } | null>(null)

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
        <div className='flex gap-2 items-center w-[160px]'>
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
      id: 'email',
      header: 'Email',
      accessorKey: 'email',
      cell: ({ row }) => (
        <div className='w-[140px]'>
          <p>{row.original?.email}</p>
        </div>
      ),
    },
    {
      id: 'phone',
      header: 'No Telp',
      accessorKey: 'phoneNumber',
      cell: ({ row }) => (
        <div className='w-[120px]'>
          {row.original.phoneNumber && (
            <p>{formatPhone(row.original.phoneNumber)}</p>
          )}
        </div>
      ),
    },
    {
      id: 'status',
      header: 'Status',
      cell: ({ row }) => <Chips status={row.original.active} />,
    },
    {
      id: 'role',
      header: 'Akses',
      cell: ({ row }) => (
        <AddUserRole id={row.original.id} roleId={row.original.role.id} />
      ),
    },
    {
      id: 'action',
      cell: ({ row }) => (
        <div className='flex justify-end items-center gap-4'>
          {row.original.role.name !== 'Superadmin' && (
            <>
              <Button
                variant='outline'
                className='py-1 h-fit'
                size='sm'
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
              <DropdownEdit className='-translate-x-3'>
                <DropdownMenuItem
                  onClick={() => {
                    if (row.original.active) {
                      deactivate({ id: row.original.id })
                    } else {
                      activate({ id: row.original.id })
                    }
                  }}
                >
                  {row.original.active ? 'Nonaktifkan' : 'Aktifkan'}
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setDialog({ id: row.original.id, open: true })}
                >
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() =>
                    setOpenDelete({ id: row.original.id, open: true })
                  }
                >
                  Hapus
                </DropdownMenuItem>
              </DropdownEdit>
            </>
          )}
        </div>
      ),
    },
  ]

  const user = useAtomValue(userAtom)

  return (
    <DashboardLayout className='overflow-hidden'>
      <HeadTable>
        <div className='flex gap-4 items-center'>
          <UserCircle className='text-[#989CA8]' />
          <p className='text-dark font-medium'>User</p>
        </div>
        <Button onClick={() => setDialog({ open: true, id: null })}>
          User Baru
        </Button>
      </HeadTable>
      <FilterTable />
      <DataTable
        columns={column}
        data={users?.data.filter((item) => item.id !== user?.id) || []}
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
      <AddUser
        open={dialog?.open || false}
        setOpen={() => setDialog(null)}
        id={dialog?.id}
      />
      <AlertDialogV1
        title='Hapus akun'
        body='Akun ini akan dihapus dari sistem'
        cancelText='Batal'
        className='bg-destructive'
        confirmText='Hapus'
        onConfirm={() => openDelete?.id && remove({ id: openDelete?.id })}
        open={openDelete?.open}
        setOpen={() => setOpenDelete({ id: null, open: false })}
      />
    </DashboardLayout>
  )
}

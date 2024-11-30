import useUrlState from '@ahooksjs/use-url-state'
import { ColumnDef } from '@tanstack/react-table'
import { UserCircle } from 'lucide-react'
import { useAtomValue } from 'jotai'
import { useState } from 'react'

import usePermission from '@/hooks/use-permission'
import useTour from '@/hooks/use-tour'
import { useApiData } from '@/hooks/use-api-data'

import { userAtom } from '@/atom/auth'

import { formatPhone } from '@/utils/format-phone'
import { TEST_ID } from '@/utils/constant/_testId'
import { BASE_URL } from '@/utils/constant/_urls'
import { PATH } from '@/utils/constant/_paths'
import { User } from '@/utils/types/api'
import {
  useAccountPagination,
  useActiveAccount,
  useDeactiveAccount,
  useDeleteAccount,
  useResetPassword,
} from '@/hooks/api/use-account'

import ProtectedComponent from '@/components/protected'
import { FilterTable, HeadTable } from '@/components/data-table/component'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { DataTable } from '@/components/data-table'
import { Button } from '@/components/ui/button'

import AlertDialogV1 from '@/components/common/alert-dialog-v1'
import DropdownEdit from '@/components/common/dropdown-edit'
import Chips from '@/components/common/chips'
import Tour from '@/components/common/tour'

import AddUserRole from './_component.ts/add-user-role'
import AddUser from './_component.ts/add-user'
import { DashboardLayout } from '../_component/layout'
import { steps } from './_component.ts/tour-index'
import { useTitle } from '../_component/header'

const LINKS = [
  { name: 'Dashboard', path: PATH.DASHBOARD_OVERVIEW },
  { name: 'Admin', path: PATH.ADMIN_USER },
]

export default function Index() {
  useTitle(LINKS)

  const permission = usePermission()

  // handle tour
  const tours = useTour('user')

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

  const [url] = useUrlState({ page: '', name: '' })
  const { data: users, isLoading } = useApiData(
    useAccountPagination({ page: url.page, name: url.name })
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
        <div
          id={`${TEST_ID.BUTTON_ADD_ROLE}-${row.index + 1}`}
          data-testid={`${TEST_ID.BUTTON_ADD_ROLE}-${row.index + 1}`}
        >
          <AddUserRole
            id={row.original.id}
            roleId={row.original.role.id}
            permission={permission}
          />
        </div>
      ),
    },
    {
      id: 'action',
      cell: ({ row }) => (
        <div className='flex justify-end items-center gap-4'>
          <ProtectedComponent required={['user:reset-password']}>
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
              id={`${TEST_ID.BUTTON_RESET}-${row.index + 1}`}
              data-testid={`${TEST_ID.BUTTON_RESET}-${row.index + 1}`}
            >
              Reset Password
            </Button>
          </ProtectedComponent>
          <ProtectedComponent
            required={['user:activate', 'user:update', 'user:delete']}
          >
            <DropdownEdit className='-translate-x-3'>
              <ProtectedComponent required={['user:activate']}>
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
              </ProtectedComponent>
              <ProtectedComponent required={['user:update']}>
                <DropdownMenuItem
                  onClick={() => setDialog({ id: row.original.id, open: true })}
                >
                  Edit
                </DropdownMenuItem>
              </ProtectedComponent>
              <ProtectedComponent required={['user:delete']}>
                <DropdownMenuItem
                  onClick={() =>
                    setOpenDelete({ id: row.original.id, open: true })
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

  const user = useAtomValue(userAtom)

  return (
    <DashboardLayout className='overflow-hidden'>
      <HeadTable>
        <div className='flex gap-4 items-center'>
          <UserCircle className='text-[#989CA8]' />
          <p className='text-dark font-medium'>User</p>
        </div>
        <ProtectedComponent required={['user:create']}>
          <Button
            onClick={() => setDialog({ open: true, id: null })}
            id={TEST_ID.BUTTON_ADD_USER}
            data-testid={TEST_ID.BUTTON_ADD_USER}
          >
            User Baru
          </Button>
        </ProtectedComponent>
      </HeadTable>
      <FilterTable />
      <DataTable
        columns={column}
        data={
          users?.data.filter(
            (item) => item.id !== user?.id || user?.id !== 1
          ) || []
        }
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

      <Tour steps={steps} {...tours} />
    </DashboardLayout>
  )
}

import { ColumnDef } from '@tanstack/react-table'
import { DashboardLayout } from '../_component/layout'
import { Role } from '@/utils/types/api'
import { DataTable } from '@/components/data-table'
import { useApiData } from '@/hooks/use-api-data'
import { Button } from '@/components/ui/button'
import { FilterTable, HeadTable } from '@/components/data-table/component'
import { UserCircle } from 'lucide-react'
import DropdownEdit from '@/components/common/dropdown-edit'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { PATH } from '@/utils/constant/_paths'
import { useTitle } from '../_component/header'
import { useState } from 'react'
import { useDeleteRole, useRoles } from '@/hooks/api/use-role'
import AddRole from './_component.ts/add-role'
import AddPermission from './_component.ts/add-permission'
import AlertDialogV1 from '@/components/common/alert-dialog-v1'

const LINKS = [
  { name: 'Dashboard', path: PATH.DASHBOARD_OVERVIEW },
  { name: 'Role', path: PATH.ADMIN_ROLE },
]

export default function Index() {
  useTitle(LINKS)

  const { mutate: remove } = useDeleteRole()

  // HANDLE DIALOG NEW USER
  const [openDialog, setOpenDialog] = useState<{
    id: number | null
    open: boolean
  } | null>(null)

  const [openPermission, setOpenPermission] = useState<{
    id: number | null
    open: boolean
  } | null>(null)

  const [openDelete, setOpenDelete] = useState<{
    id: number
    open: boolean
  } | null>(null)

  const { data: roles, isLoading } = useApiData(useRoles())
  const column: ColumnDef<Role>[] = [
    {
      id: 'name',
      accessorKey: 'name',
      header: 'Name',
    },
    {
      id: 'email',
      header: 'description',
      accessorKey: 'description',
    },

    {
      id: 'action',
      cell: ({ row }) => (
        <div className='flex justify-end items-center gap-4'>
          <DropdownEdit className='-translate-x-3'>
            <DropdownMenuItem
              onClick={() =>
                setOpenPermission({ id: row.original.id, open: true })
              }
            >
              Hak istimewa
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setOpenDialog({ id: row.original.id, open: true })}
            >
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setOpenDelete({ id: row.original.id, open: true })}
            >
              Hapus
            </DropdownMenuItem>
          </DropdownEdit>
        </div>
      ),
    },
  ]

  return (
    <DashboardLayout className='overflow-hidden'>
      <HeadTable>
        <div className='flex gap-4 items-center'>
          <UserCircle className='text-[#989CA8]' />
          <p className='text-dark font-medium'>Peran</p>
        </div>
        <Button onClick={() => setOpenDialog({ id: null, open: true })}>
          Peran Baru
        </Button>
      </HeadTable>
      <FilterTable />
      <DataTable columns={column} data={roles || []} isLoading={isLoading} />
      <AddRole
        open={openDialog?.open || false}
        setOpen={() => setOpenDialog(null)}
        id={openDialog?.id}
      />
      <AddPermission
        open={openPermission?.open || false}
        setOpen={() => setOpenPermission(null)}
        id={openPermission?.id}
      />
      <AlertDialogV1
        title='Hapus peran'
        body='Peran ini akan dihapus dari sistem'
        cancelText='Batat'
        className='bg-destructive'
        confirmText='Hapus'
        onConfirm={() => openDelete?.id && remove({ id: openDelete?.id })}
        open={openDelete?.open || false}
        setOpen={() => setOpenDelete(null)}
      />
    </DashboardLayout>
  )
}

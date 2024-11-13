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
import { useRoles } from '@/hooks/api/use-role'
import AddRole from './_component.ts/add-role'

const LINKS = [
  { name: 'Dashboard', path: PATH.DASHBOARD_OVERVIEW },
  { name: 'Role', path: PATH.ADMIN_ROLE },
]

export default function Index() {
  useTitle(LINKS)

  // HANDLE DIALOG NEW USER
  const [dialog, setDialog] = useState<{
    id: number | null
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
              onClick={() => setDialog({ id: row.original.id, open: true })}
            >
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem>Hapus</DropdownMenuItem>
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
        <Button onClick={() => setDialog({ id: null, open: true })}>
          Peran Baru
        </Button>
      </HeadTable>
      <FilterTable />
      <DataTable columns={column} data={roles || []} isLoading={isLoading} />
      <AddRole
        open={dialog?.open || false}
        setOpen={() => setDialog(null)}
        id={dialog?.id}
      />
    </DashboardLayout>
  )
}

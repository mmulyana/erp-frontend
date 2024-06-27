import { ColumnDef } from '@tanstack/react-table'
import { Account } from '@/utils/types/account'
import Action from './action'

export const columns: ColumnDef<Partial<Account>>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'roles.name',
    header: 'Role',
    cell: ({ row }) => row.original.roles?.name || '-',
  },
  {
    id: 'action',
    header: '',
    cell: ({ row }) => <Action id={row.original.id} />,
  },
]

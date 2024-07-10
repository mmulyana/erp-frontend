import { ColumnDef } from '@tanstack/react-table'
import { Roles } from '@/utils/types/roles'
import Action from './action'

export const columns: ColumnDef<Partial<Roles>>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => row.original.name,
  },
  {
    id: 'action',
    header: '',
    cell: ({ row }) => <Action id={row.original.id} />,
  },
]

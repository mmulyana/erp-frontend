import { ColumnDef } from '@tanstack/react-table'
import { Roles } from '@/utils/types/roles'

export const columns: ColumnDef<Partial<Roles>>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => row.original.name,
  },
  {
    id: 'action',
    header: '',
  },
]

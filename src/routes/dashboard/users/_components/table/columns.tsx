import { Button } from '@/components/ui/button'
import { Roles } from '@/utils/types/roles'
import { ColumnDef } from '@tanstack/react-table'
import { Pencil, Trash } from 'lucide-react'

export const columns: ColumnDef<Partial<Roles>>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    id: 'action',
    header: '',
    cell: ({ row }) => {
      return (
        <div className='flex gap-2 items-center justify-end'>
          <Button variant='ghost' className='text-gray-400 hover:text-gray-800'>
            <Pencil className='h-4 w-4' />
          </Button>
          <Button variant='ghost' className='text-gray-400 hover:text-red-400'>
            <Trash className='h-4 w-4' />
          </Button>
        </div>
      )
    },
  },
]

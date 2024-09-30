import { Button } from '@/components/ui/button'
import {
  GoodsBrand,
  GoodsCategory,
  GoodsLocation,
  GoodsMeasurement,
  SupplierTag,
} from '@/utils/types/api'
import { ColumnDef } from '@tanstack/react-table'
import { Ellipsis } from 'lucide-react'

export const columnsBrand: ColumnDef<GoodsBrand>[] = [
  {
    accessorKey: 'name',
    header: 'Nama',
    cell: ({ row }) => (
      <div className='flex items-center gap-4'>
        <img
          className='w-12 h-12 rounded object-center object-cover'
          src={import.meta.env.VITE_BASE_URL + '/img/' + row.original.photoUrl}
        />
        <p>{row.original.name}</p>
      </div>
    ),
  },
  {
    id: 'action',
    cell: () => (
      <div className='flex justify-end'>
        <Button
          variant='outline'
          className='p-0.5 rounded-[6px] h-5 w-5 border-[#EFF0F2]'
        >
          <Ellipsis className='w-4 h-4 text-[#313951]' />
        </Button>
      </div>
    ),
  },
]
export const columnsCategory: ColumnDef<GoodsCategory>[] = [
  {
    accessorKey: 'name',
    header: 'Nama',
  },
  {
    id: 'action',
    cell: () => (
      <div className='flex justify-end'>
        <Button
          variant='outline'
          className='p-0.5 rounded-[6px] h-5 w-5 border-[#EFF0F2]'
        >
          <Ellipsis className='w-4 h-4 text-[#313951]' />
        </Button>
      </div>
    ),
  },
]
export const columnsLocation: ColumnDef<GoodsLocation>[] = [
  {
    accessorKey: 'name',
    header: 'Nama',
  },
  {
    id: 'action',
    cell: () => (
      <div className='flex justify-end'>
        <Button
          variant='outline'
          className='p-0.5 rounded-[6px] h-5 w-5 border-[#EFF0F2]'
        >
          <Ellipsis className='w-4 h-4 text-[#313951]' />
        </Button>
      </div>
    ),
  },
]
export const columnsMeasurement: ColumnDef<GoodsMeasurement>[] = [
  {
    accessorKey: 'name',
    header: 'Nama',
  },
  {
    id: 'action',
    cell: () => (
      <div className='flex justify-end'>
        <Button
          variant='outline'
          className='p-0.5 rounded-[6px] h-5 w-5 border-[#EFF0F2]'
        >
          <Ellipsis className='w-4 h-4 text-[#313951]' />
        </Button>
      </div>
    ),
  },
]
export const columnsTag: ColumnDef<SupplierTag>[] = [
  {
    accessorKey: 'name',
    header: 'Nama',
  },
  {
    id: 'action',
    cell: () => (
      <div className='flex justify-end'>
        <Button
          variant='outline'
          className='p-0.5 rounded-[6px] h-5 w-5 border-[#EFF0F2]'
        >
          <Ellipsis className='w-4 h-4 text-[#313951]' />
        </Button>
      </div>
    ),
  },
]

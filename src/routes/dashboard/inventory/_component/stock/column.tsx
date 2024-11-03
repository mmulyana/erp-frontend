import DropdownEdit from '@/components/common/dropdown-edit'
import { formatToRupiah } from '@/utils/formatCurrency'
import { generatePath, Link } from 'react-router-dom'
import Overlay from '@/components/common/overlay'
import { ColumnDef } from '@tanstack/react-table'
import { Transaction } from '@/utils/types/api'
import { PATH } from '@/utils/constant/_paths'
import { format } from 'date-fns'
import {
  DropdownMenuGroup,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu'
import { useSetAtom } from 'jotai'
import { dialogDetailTransaction } from './detail-transaction'

export const column: ColumnDef<Transaction>[] = [
  {
    id: 'name',
    header: 'Nama',
    cell: ({ row }) => {
      const detail = row.original.good.name || ''
      return (
        <Overlay
          className='w-fit pr-2.5'
          overlay={
            <Link
              to={generatePath(PATH.INVENTORY_SUPPLIER_EMPLOYEE, {
                detail: `${detail}-${row.original.id}`,
              })}
              className='absolute -right-0 translate-x-full text-sm text-[#313951] py-1 px-2 rounded-[6px] border border-[#EFF0F2] top-1/2 -translate-y-1/2 bg-white hover:shadow-sm hover:shadow-gray-200'
            >
              Lihat
            </Link>
          }
        >
          <Link
            to={generatePath(PATH.INVENTORY_SUPPLIER_EMPLOYEE, {
              detail: `${detail}-${row.original.id}`,
            })}
          >
            {detail}
          </Link>
        </Overlay>
      )
    },
  },
  {
    id: 'measurement',
    header: 'Satuan',
    cell: ({ row }) => <p>{row.original.good.measurement?.name}</p>,
  },
  {
    accessorKey: 'qty',
    header: 'Qty',
  },
  {
    accessorKey: 'price',
    header: 'Harga',
    cell: ({ row }) => <p>{formatToRupiah(Number(row.original.price))}</p>,
  },
  {
    id: 'brand',
    header: 'Merek',
    cell: ({ row }) => <p>{row.original.good.brand?.name}</p>,
  },
  {
    id: 'supplier',
    header: 'Toko',
    cell: ({ row }) => <p>{row.original?.supplier?.name}</p>,
  },
  {
    accessorKey: 'date',
    header: 'Tanggal',
    cell: ({ row }) => <p>{format(row.original.date, 'dd/MM/yyyy')}</p>,
  },
  {
    id: 'action',
    cell: ({ row }) => {
      const setSelected = useSetAtom(dialogDetailTransaction)
      return (
        <DropdownEdit className='flex justify-end'>
          <DropdownMenuGroup>
            <DropdownMenuItem
              className='rounded-none text-sm text-dark/70 cursor-pointer'
              onClick={() => {
                setSelected({
                  id: row.original.id,
                  open: true,
                })
              }}
            >
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem className='rounded-none text-sm text-dark/70 cursor-pointer'>
              Hapus
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownEdit>
      )
    },
  },
]

import { generatePath, Link } from 'react-router-dom'
import Overlay from '@/components/common/overlay'
import { ColumnDef } from '@tanstack/react-table'
import { Transaction } from '@/utils/types/api'
import { PATH } from '@/utils/constant/_paths'
import { Button } from '@/components/ui/button'
import { Ellipsis } from 'lucide-react'
import { format } from 'date-fns'
import { formatToRupiah } from '@/utils/formatCurrency'

export const column: ColumnDef<Transaction>[] = [
  {
    id: 'name',
    header: 'Nama',
    cell: ({ row }) => {
      const detail = row.original.good.name
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
    cell: ({ row }) => <p>{row.original.supplier.name}</p>,
  },
  {
    accessorKey: 'date',
    header: 'Tanggal',
    cell: ({ row }) => <p>{format(row.original.date, 'dd MMMM yyyy')}</p>,
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

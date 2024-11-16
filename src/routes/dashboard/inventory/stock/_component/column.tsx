import { generatePath, Link } from 'react-router-dom'
import { ColumnDef } from '@tanstack/react-table'
import { useSetAtom } from 'jotai'
import { format } from 'date-fns'

import { formatToRupiah } from '@/utils/formatCurrency'
import { Transaction } from '@/utils/types/api'
import { PATH } from '@/utils/constant/_paths'

import DropdownEdit from '@/components/common/dropdown-edit'
import Overlay from '@/components/common/overlay'
import {
  DropdownMenuGroup,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu'

import { dialogDetailTransaction } from './detail-transaction'
import { Button } from '@/components/ui/button'
import { Undo2 } from 'lucide-react'
import { useReturnedTransaction } from '@/hooks/api/use-transaction'
import { dialogDeleteTransaction } from './delete-transaction'

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
    id: 'qty',
    accessorKey: 'qty',
    header: 'Qty',
  },
  {
    id: 'price',
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
    id: 'project',
    header: 'Project',
    cell: ({ row }) => <p>{row.original?.project?.name}</p>,
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
      const setSelectedDelete = useSetAtom(dialogDeleteTransaction)

      const { mutate: returned } = useReturnedTransaction()

      return (
        <div className='flex justify-end items-center gap-2'>
          {row.original.type == 'borrowed' && !row.original.is_returned && (
            <Button
              className='bg-yellow-100 hover:bg-yellow-500 text-sm h-fit py-1 pr-2 pl-2.5 font-normal gap-1 group'
              variant='secondary'
              onClick={() => returned({ id: row.original.id })}
            >
              Kembalikan{' '}
              <Undo2
                size={16}
                className='text-yellow-600 group-hover:text-white'
              />
            </Button>
          )}
          <DropdownEdit>
            <DropdownMenuGroup>
              {!(
                row.original.is_returned && row.original.type === 'borrowed'
              ) && (
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
              )}
              <DropdownMenuItem
                className='rounded-none text-sm text-dark/70 cursor-pointer'
                onClick={() => {
                  setSelectedDelete({
                    id: row.original.id,
                    open: true,
                  })
                }}
              >
                Hapus
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownEdit>
        </div>
      )
    },
  },
]

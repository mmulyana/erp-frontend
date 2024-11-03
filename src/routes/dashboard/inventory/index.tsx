import DetailGoods, { selectedGoodAtom } from './_component/index/detail-goods'
import { FilterTable, HeadTable } from '@/components/data-table/component'
import AddGood, { dialogGoodAtom } from './_component/add-good'
import CardHighlight from './_component/index/card-highlight'
import DropdownEdit from '@/components/common/dropdown-edit'
import { DashboardLayout } from '../_component/layout'
import { DataTable } from '@/components/data-table'
import { ColumnDef } from '@tanstack/react-table'
import Overlay from '@/components/common/overlay'
import { useGoods } from '@/hooks/api/use-goods'
import { Button } from '@/components/ui/button'
import { useTitle } from '../_component/header'
import { PATH } from '@/utils/constant/_paths'
import { Goods } from '@/utils/types/api'
import { Package } from 'lucide-react'
import { useSetAtom } from 'jotai'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { useApiData } from '@/hooks/use-api-data'

// import { ScrollArea } from '@/components/ui/scroll-area'
// import CardActivity from './_component/index/card-activity'
// import ButtonLink from './_component/button-link'
// import Container from '../_component/container'
// import { Link } from 'react-router-dom'

export const links = [
  {
    name: 'Inventory',
    path: PATH.INVENTORY_INDEX,
  },
]

export default function Index() {
  useTitle(links)

  const setSelected = useSetAtom(selectedGoodAtom)
  const setOpen = useSetAtom(dialogGoodAtom)

  const { data, isLoading } = useApiData(useGoods())

  // START OF COLUMNS
  const columns: ColumnDef<Goods>[] = [
    {
      accessorKey: 'name',
      header: 'Nama',
      cell: ({ row }) => {
        const { name, id } = row.original
        return (
          <Overlay
            className='w-fit pr-14'
            overlay={
              <button
                onClick={() => {
                  setSelected({ id, open: true })
                }}
                className='absolute right-0 top-1/2 -translate-y-1/2 text-sm text-[#313951] py-1 px-2 rounded-[6px] border border-[#EFF0F2] bg-white hover:shadow-sm hover:shadow-gray-200'
              >
                Lihat
              </button>
            }
          >
            <div className='hover:text-dark'>
              <button
                onClick={() => {
                  setSelected({ id, open: true })
                }}
                className='justify-start flex'
              >
                <span className='break-words max-w-[120px] text-left'>
                  {name}
                </span>
              </button>
            </div>
          </Overlay>
        )
      },
    },
    {
      id: 'brand',
      header: 'Merek',
      cell: ({ row }) => <p>{row.original?.brand?.name}</p>,
    },
    {
      id: 'measurement',
      header: 'Satuan',
      cell: ({ row }) => <p>{row.original?.measurement?.name}</p>,
    },
    {
      accessorKey: 'qty',
      header: 'Qty',
    },
    {
      accessorKey: 'available',
      header: 'Ketersediaan',
    },
    {
      id: 'location',
      header: 'Lokasi',
      cell: ({ row }) => <p>{row.original?.location?.name}</p>,
    },
    {
      id: 'action',
      cell: () => (
        <div className='flex justify-end'>
          <DropdownEdit>
            <DropdownMenuItem>Hapus</DropdownMenuItem>
          </DropdownEdit>
        </div>
      ),
    },
  ]
  // END OF COLUMNS

  return (
    <>
      <DashboardLayout>
        <div className='p-4 flex flex-col gap-4'>
          <CardHighlight />

          <div className='rounded-lg border border-line overflow-hidden'>
            <HeadTable>
              <div className='flex gap-4 items-center'>
                <Package className='text-[#989CA8]' />
                <p className='text-dark font-medium'>Barang</p>
              </div>
              <div className='flex gap-2 items-center'>
                <Button onClick={() => setOpen(true)}>Tambah</Button>
              </div>
            </HeadTable>
            <FilterTable placeholder='Cari barang' />
            <DataTable
              columns={columns}
              data={data || []}
              withLoading
              withPagination
              isLoading={isLoading}
              styleFooter='border-t border-b-0'
            />
          </div>
        </div>
      </DashboardLayout>
      <DetailGoods />
      <AddGood />
    </>
  )
}

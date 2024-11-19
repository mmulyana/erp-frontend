import useUrlState from '@ahooksjs/use-url-state'
import { ColumnDef } from '@tanstack/react-table'
import { useAtomValue, useSetAtom } from 'jotai'
import { Package, Settings2Icon } from 'lucide-react'
import { useState } from 'react'

import { useDeleteGoods, useGoodsByPagination } from '@/hooks/api/use-goods'
import { useApiData } from '@/hooks/use-api-data'
import { PATH } from '@/utils/constant/_paths'
import { Goods } from '@/utils/types/api'

import { permissionAtom } from '@/atom/permission'

import { FilterTable, HeadTable } from '@/components/data-table/component'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { DataTable } from '@/components/data-table'
import { Button } from '@/components/ui/button'

import AlertDialogV1 from '@/components/common/alert-dialog-v1'
import DropdownEdit from '@/components/common/dropdown-edit'
import Overlay from '@/components/common/overlay'

import DetailGoods, { selectedGoodAtom } from './_component/index/detail-goods'
import AddGood, { dialogGoodAtom } from './_component/index/add-good'
import CardHighlight from './_component/index/card-highlight'
import ProtectedComponent from '@/components/protected'

import { settingConfig } from '../_component/setting/setting'
import { DashboardLayout } from '../_component/layout'
import { useTitle } from '../_component/header'

export const links = [
  {
    name: 'Inventory',
    path: PATH.INVENTORY_INDEX,
  },
]

export default function Index() {
  useTitle(links)

  const setSetting = useSetAtom(settingConfig)
  const permission = useAtomValue(permissionAtom)

  // HANDLE DIALOG
  const setSelected = useSetAtom(selectedGoodAtom)
  const setOpen = useSetAtom(dialogGoodAtom)
  const [selectedDelete, setSelectedDelete] = useState<{
    id: number
    open: boolean
  } | null>(null)

  // HANDLE DATA
  const [url] = useUrlState({ page: '', name: '' })

  const { mutate } = useDeleteGoods()
  const { data, isLoading } = useApiData(
    useGoodsByPagination({
      ...(url.page !== '' ? { page: url.page } : undefined),
      ...(url.name !== '' ? { name: url.name } : undefined),
    })
  )

  // START OF COLUMNS
  const columns: ColumnDef<Goods>[] = [
    {
      accessorKey: 'name',
      header: 'Nama',
      cell: ({ row }) => {
        const { name, id } = row.original
        const isAllowed = permission.includes('item:create')
        return (
          <div className='w-[120px]'>
            <Overlay
              className='w-fit pr-2'
              overlay={
                isAllowed && (
                  <button
                    onClick={() => {
                      setSelected({ id, open: true })
                    }}
                    className='absolute left-full top-1/2 -translate-y-1/2 text-sm text-[#313951] py-1 px-2 rounded-[6px] border border-[#EFF0F2] bg-white hover:shadow-sm hover:shadow-gray-200'
                  >
                    Lihat
                  </button>
                )
              }
            >
              <div className='hover:text-dark'>
                <button
                  onClick={() => {
                    setSelected({ id, open: true })
                  }}
                  className='justify-start flex'
                  disabled={!isAllowed}
                >
                  <span className='break-words max-w-[200px] text-left'>
                    {name}
                  </span>
                </button>
              </div>
            </Overlay>
          </div>
        )
      },
    },
    {
      id: 'category',
      header: 'Kategori',
      cell: ({ row }) => <p>{row.original?.category?.name}</p>,
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
      cell: ({ row }) => (
        <div className='flex justify-end'>
          <ProtectedComponent required={['item:delete']}>
            <DropdownEdit>
              <ProtectedComponent required={['item:delete']}>
                <DropdownMenuItem
                  onClick={() => {
                    setSelectedDelete({
                      id: row.original.id,
                      open: true,
                    })
                  }}
                >
                  Hapus
                </DropdownMenuItem>
              </ProtectedComponent>
            </DropdownEdit>
          </ProtectedComponent>
        </div>
      ),
    },
  ]
  // END OF COLUMNS

  return (
    <>
      <DashboardLayout className='overflow-hidden'>
        <div className='p-4 flex flex-col gap-4'>
          <CardHighlight />
          <div className='rounded-lg border border-line overflow-auto'>
            <HeadTable>
              <div className='flex gap-4 items-center'>
                <Package className='text-[#989CA8]' />
                <p className='text-dark font-medium'>Barang</p>
              </div>
              <div className='flex gap-2 items-center'>
                <Button
                  variant='secondary'
                  className='w-8 p-0'
                  onClick={() =>
                    setSetting({ open: true, default: 'inventory_category' })
                  }
                >
                  <Settings2Icon className='w-4 h-4 text-dark/70' />
                </Button>
                <ProtectedComponent required={['item:create']}>
                  <Button onClick={() => setOpen(true)}>Tambah</Button>
                </ProtectedComponent>
              </div>
            </HeadTable>
            <FilterTable placeholder='Cari barang' />
            <DataTable
              columns={columns}
              isLoading={isLoading}
              data={data?.data || []}
              totalPages={data?.total_pages}
              styleFooter='border-t border-b-0'
              withPagination
            />
          </div>
        </div>
      </DashboardLayout>
      <DetailGoods />
      <AddGood />
      <AlertDialogV1
        open={selectedDelete?.open}
        setOpen={() => setSelectedDelete(null)}
        title='Hati-hati! Tindakan ini tidak bisa dibatalkan'
        body='Data barang akan dihapus dalam sistem'
        onConfirm={() => {
          if (!selectedDelete?.id) return
          mutate(
            { id: selectedDelete?.id },
            { onSuccess: () => setSelectedDelete(null) }
          )
        }}
      />
    </>
  )
}

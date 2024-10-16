import { ColumnDef } from '@tanstack/react-table'
import { DashboardLayout } from '../_component/layout'
import { Supplier as SupplierType } from '@/utils/types/api'
import { Button } from '@/components/ui/button'
import { BoxIcon, TrashIcon } from 'lucide-react'
import { useSupplier } from '@/hooks/api/use-supplier'
import { useMemo, useState } from 'react'
import { DataTable } from '@/components/data-table'
import Overlay from '@/components/common/overlay'
import { PATH } from '@/utils/constant/_paths'
import { useTitle } from '../_component/header'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { FilterTable, HeadTable } from '@/components/data-table/component'
import DropdownEdit from '@/components/common/dropdown-edit'
import DialogAddSupplier from './_component/supplier/dialog-add-supplier'
import DialogDeleteSupplier from './_component/supplier/dialog-delete-supplier'
import DetailSupplier from './_component/supplier/detail-supplier'

export const links = [
  {
    name: 'Inventory',
    path: PATH.INVENTORY_INDEX,
  },
  {
    name: 'Supplier',
    path: PATH.INVENTORY_SUPPLIER,
  },
]

export default function Supplier() {
  useTitle(links)

  // const [url, setUrl] = useUrlState({ name: '', tag: '', status: '' })

  // GET DATA
  const {
    data: dataSupplier,
    isLoading,
    isFetching,
  } = useSupplier({
    // ...(url.name !== '' ? { name: url.name } : undefined),
    // ...(url.tag !== '' ? { tag: url.tag } : undefined),
  })
  const data = useMemo(() => dataSupplier?.data?.data, [isLoading, isFetching])

  // COLUMNS
  const columns: ColumnDef<SupplierType>[] = [
    {
      accessorKey: 'name',
      header: 'Nama',
      cell: ({ row }) => {
        return (
          <Overlay
            className='min-w-[140px]'
            overlay={
              <button
                onClick={() => {
                  setSelectedId(row.original.id)
                  handleDialog('detail', true)
                }}
                className='absolute right-0 text-sm text-[#313951] py-1 px-2 rounded-[6px] border border-[#EFF0F2] top-1/2 -translate-y-1/2 bg-white hover:shadow-sm hover:shadow-gray-200'
              >
                Lihat
              </button>
            }
          >
            <button
              className='appearance-none'
              onClick={() => {
                setSelectedId(row.original.id)
                handleDialog('detail', true)
              }}
            >
              {row?.original?.name}
            </button>
          </Overlay>
        )
      },
    },
    {
      accessorKey: 'phone',
      header: 'No. Telp',
    },
    {
      accessorKey: 'email',
      header: 'Email',
    },
    {
      accessorKey: 'address',
      header: 'Alamat',
      cell: ({row}) => <div className='w-[200px]'>{row.original.address}</div>
    },
    {
      id: 'tag',
      header: 'Tag',
      cell: ({ row }) => {
        return (
          <div className='flex gap-2 flex-wrap items-center max-w-[180px]'>
            {row.original.tags.map((item, index) => (
              <div
                key={index}
                className='text-sm px-2 py-0.5 rounded-full bg-[#4EB4CA]/10 text-[#4EB4CA]'
              >
                {item.tag.name}
              </div>
            ))}
          </div>
        )
      },
    },
    {
      id: 'action',
      cell: ({ row }) => (
        <div className='flex justify-end'>
          <DropdownEdit className='-translate-x-3'>
            <DropdownMenuItem className='cursor-pointer p-0'>
              <Button
                className='gap-1 justify-start px-2 flex items-center w-full border-none'
                variant='outline'
                onClick={() => {
                  setSelectedId(row.original.id)
                  handleDialog('delete', true)
                }}
              >
                <TrashIcon className='w-4 h-4 text-red-400' />
                Hapus
              </Button>
            </DropdownMenuItem>
          </DropdownEdit>
        </div>
      ),
    },
  ]

  // HANDLE DIALOG
  type Dialog = { add: boolean; delete: boolean; detail: boolean }
  const [dialog, setDialog] = useState<Dialog>({
    add: false,
    delete: false,
    detail: false,
  })
  const [selectedId, setSelectedId] = useState<number | null>(null)

  const handleDialog = (type: keyof Dialog, val?: boolean) => {
    setDialog((prev) => ({ ...prev, [type]: val || false }))
    if (!val && selectedId !== null) {
      setSelectedId(null)
    }
  }

  return (
    <DashboardLayout>
      <HeadTable>
        <div className='flex gap-4 items-center'>
          <BoxIcon className='text-[#989CA8]' />
          <p className='text-dark font-medium'>Supplier</p>
        </div>
        <Button onClick={() => handleDialog('add', true)}>Tambah</Button>
      </HeadTable>
      <FilterTable />
      <DataTable
        columns={columns}
        data={data || []}
        isLoading={isLoading}
        withLoading
        withPagination
      />
      <DialogAddSupplier
        open={dialog.add}
        setOpen={(val) => handleDialog('add', val)}
      />
      <DialogDeleteSupplier
        open={dialog.delete}
        setOpen={(val) => handleDialog('delete', val)}
        id={selectedId}
        setId={setSelectedId}
      />
      <DetailSupplier
        id={selectedId}
        open={dialog.detail}
        setOpen={(val) => handleDialog('detail', val)}
      />
    </DashboardLayout>
  )
}

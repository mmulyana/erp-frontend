import useUrlState from '@ahooksjs/use-url-state'
import { BoxIcon, Settings2Icon } from 'lucide-react'
import { ColumnDef } from '@tanstack/react-table'
import { useSetAtom } from 'jotai'
import { useState } from 'react'

import { useSupplier } from '@/hooks/api/use-supplier'
import { useApiData } from '@/shared/hooks/use-api-data'
import useTour from '@/hooks/use-tour'

import { Supplier as SupplierType } from '@/utils/types/api'
import { PATH } from '@/shared/constants/_paths'

import DialogDeleteSupplier from './_component/supplier/dialog-delete-supplier'
import DialogAddSupplier from './_component/supplier/dialog-add-supplier'
import DetailSupplier from './_component/supplier/detail-supplier'
import LabelSupplier from './_component/supplier/label-supplier'
import { settingConfig } from '../../../shared/components/setting/setting'
import { DashboardLayout } from '../../../shared/components/layout'
import { steps } from './_component/tour-supplier'
import { useTitle } from '../../../shared/components/header'

import DropdownEdit from '@/components/common/dropdown-edit'
import ProtectedComponent from '@/components/protected'
import Overlay from '@/components/common/overlay'
import Tour from '@/components/common/tour'
import { FilterTable, HeadTable } from '@/shared/components/data-table/component'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { DataTable } from '@/shared/components/data-table'
import { Button } from '@/components/ui/button'
import { TEST_ID } from '@/shared/constants/_testId'

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

  const setSetting = useSetAtom(settingConfig)

  // handle tour
  const tours = useTour('supplier')

  const [url, _] = useUrlState({ name: '', tag: '', status: '' })

  // GET DATA
  const { data, isLoading } = useApiData(
    useSupplier({
      ...(url.name !== '' ? { name: url.name } : undefined),
      ...(url.tag !== '' ? { tag: url.tag } : undefined),
    })
  )

  // COLUMNS
  const columns: ColumnDef<SupplierType>[] = [
    {
      accessorKey: 'name',
      header: 'Nama',
      cell: ({ row }) => {
        return (
          <Overlay
            className='w-fit pr-14'
            overlay={
              <button
                onClick={() => {
                  setSelectedId(row.original.id)
                  handleDialog('detail', true)
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
                  setSelectedId(row.original.id)
                  handleDialog('detail', true)
                }}
                className='justify-start flex'
              >
                <span className='break-words max-w-[120px] text-left'>
                  {row.original.name}
                </span>
              </button>
            </div>
          </Overlay>
        )
      },
    },
    {
      accessorKey: 'phone',
      header: 'No. Telp',
      cell: ({ row }) => (
        <div className='w-[120px]'>
          <p>{row.original.phone}</p>
        </div>
      ),
    },
    {
      accessorKey: 'email',
      header: 'Email',
    },
    {
      accessorKey: 'address',
      header: 'Alamat',
      cell: ({ row }) => (
        <div className='w-[200px]'>{row.original.address}</div>
      ),
    },
    {
      id: 'tag',
      header: 'Tag',
      cell: ({ row }) => {
        return (
          <div className='py-2 min-w-[200px]'>
            <LabelSupplier
              id={row.original.id}
              data={{ tags: row.original.tags }}
            />
          </div>
        )
      },
    },
    {
      id: 'action',
      cell: ({ row }) => (
        <div className='flex justify-end'>
          <ProtectedComponent required={['supplier:delete']}>
            <DropdownEdit className='-translate-x-3'>
              <DropdownMenuItem className='cursor-pointer p-0'>
                <Button
                  className='gap-1 justify-start flex items-center w-full border-none rounded-none'
                  variant='outline'
                  onClick={() => {
                    setSelectedId(row.original.id)
                    handleDialog('delete', true)
                  }}
                >
                  Hapus
                </Button>
              </DropdownMenuItem>
            </DropdownEdit>
          </ProtectedComponent>
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
    <DashboardLayout className='overflow-hidden'>
      <HeadTable>
        <div className='flex gap-4 items-center'>
          <BoxIcon className='text-[#989CA8]' />
          <p className='text-dark font-medium'>Supplier</p>
        </div>
        <div className='flex gap-2 items-center'>
          <Button
            variant='secondary'
            className='w-8 p-0'
            onClick={() =>
              setSetting({ open: true, default: 'inventory_label' })
            }
            id={TEST_ID.BUTTON_OPEN_SUPPLIER_LABEL_SETTING}
            data-testid={TEST_ID.BUTTON_OPEN_SUPPLIER_LABEL_SETTING}
          >
            <Settings2Icon className='w-4 h-4 text-dark/70' />
          </Button>
          <ProtectedComponent required={['supplier:create']}>
            <Button
              onClick={() => handleDialog('add', true)}
              id={TEST_ID.BUTTON_ADD_SUPPLIER}
              data-testid={TEST_ID.BUTTON_ADD_SUPPLIER}
            >
              Tambah
            </Button>
          </ProtectedComponent>
        </div>
      </HeadTable>
      <FilterTable />
      <DataTable
        columns={columns}
        data={data || []}
        isLoading={isLoading}
        clickableColumns={['name', 'phone', 'email', 'address', 'tag']}
        autoRedirect={true}
        onCellClick={({ id }) => {
          setSelectedId(id)
          handleDialog('detail', true)
        }}
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

      <Tour steps={steps} {...tours} />
    </DashboardLayout>
  )
}

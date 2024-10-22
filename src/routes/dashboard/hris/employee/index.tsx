import { DataTable } from '@/components/data-table'
import { usePosition } from '@/hooks/api/use-position'
import { useTitle } from '../../_component/header'
import { DashboardLayout } from '../../_component/layout'
import { FilterTable, HeadTable } from '@/components/data-table/component'
import { NetworkIcon, PencilIcon, TrashIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import CardStatusEmployee from './_component/index/card-status-employee'
import CardTotalEmployee from './_component/index/card-total-employee'
import { ColumnDef } from '@tanstack/react-table'
import Overlay from '@/components/common/overlay'
import { PATH } from '@/utils/constant/_paths'
import DropdownEdit from '@/components/common/dropdown-edit'
import {
  DropdownMenuGroup,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu'
import { links } from './_component/links'
import { createLinkDetail } from '@/utils/create-link-detail'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import ModalAdd from './_component/index/add-position'
import ModalDelete from './_component/index/modal-delete'

export default function Employee() {
  const positionQuery = usePosition()

  useTitle(links)

  // COLUMNS POSITION
  const columns: ColumnDef<{
    name: string
    id: number
    description?: string
  }>[] = [
    {
      accessorKey: 'name',
      header: 'Nama',
      cell: ({ cell }) => {
        const { name, id } = cell.row.original
        return (
          <Overlay
            className='w-full'
            overlay={
              <Link
                className='absolute right-0 top-1/2 -translate-y-1/2 text-sm text-[#313951] py-1 px-2 rounded-[6px] border border-[#EFF0F2] bg-white hover:shadow-sm hover:shadow-gray-200'
                to={createLinkDetail(PATH.EMPLOYEE_DETAIL, name, id)}
              >
                Lihat
              </Link>
            }
          >
            <Link
              className='hover:text-dark'
              to={createLinkDetail(PATH.EMPLOYEE_DETAIL, name, id)}
            >
              {cell.row.original.name}
            </Link>
          </Overlay>
        )
      },
    },
    {
      accessorKey: 'description',
      header: 'Deskripsi',
    },
    {
      id: 'action',
      accessorKey: 'id',
      header: '',
      size: 24,
      cell: ({ row }) => {
        return (
          <div className='flex justify-end w-full'>
            <DropdownEdit>
              <DropdownMenuGroup>
                <DropdownMenuItem
                  className='flex items-center gap-2 cursor-pointer'
                  onClick={() => {
                    handleDialog('add', true)
                    setSelectedId(row.original.id)
                  }}
                >
                  <PencilIcon className='w-3.5 h-3.5 text-dark/50' />
                  Ubah
                </DropdownMenuItem>
                <DropdownMenuItem
                  className='flex items-center gap-2 cursor-pointer'
                  onClick={() => {
                    handleDialog('delete', true)
                    setSelectedId(row.original.id)
                  }}
                >
                  <TrashIcon className='w-3.5 h-3.5 text-dark/50' />
                  Hapus
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownEdit>
          </div>
        )
      },
    },
  ]
  // COLUMNS

  // HANDLE DIALOG
  type Dialog = { add: boolean; delete: boolean }
  const [dialog, setDialog] = useState<Dialog>({
    add: false,
    delete: false,
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
      <div className='grid grid-cols-1 md:grid-cols-[1fr_340px]'>
        <div>
          <HeadTable>
            <div className='flex gap-4 items-center'>
              <NetworkIcon className='text-[#989CA8]' />
              <p className='text-dark font-medium'>Jabatan</p>
            </div>
            <Button onClick={() => handleDialog('add', true)}>Tambah</Button>
          </HeadTable>
          <FilterTable placeholder='Cari jabatan' />
          <DataTable
            data={positionQuery.data?.data?.data || []}
            columns={columns}
            withLoading
            isLoading={positionQuery.isLoading}
          />
        </div>
        <div className='h-[calc(100vh-48px)] border-l border-line p-4 space-y-4'>
          <CardTotalEmployee />
          <CardStatusEmployee />
        </div>
      </div>
      <ModalAdd
        id={selectedId}
        open={dialog.add}
        setOpen={() => handleDialog('add')}
      />
      <ModalDelete
        id={selectedId}
        open={dialog.delete}
        setOpen={() => handleDialog('delete')}
      />
    </DashboardLayout>
  )
}

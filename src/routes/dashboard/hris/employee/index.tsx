import useUrlState from '@ahooksjs/use-url-state'
import { ColumnDef } from '@tanstack/react-table'
import { NetworkIcon } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useState } from 'react'

import { createLinkDetail } from '@/utils/create-link-detail'
import { usePosition } from '@/hooks/api/use-position'
import { useApiData } from '@/hooks/use-api-data'
import { PATH } from '@/utils/constant/_paths'

import DropdownEdit from '@/components/common/dropdown-edit'
import ProtectedComponent from '@/components/protected'
import Overlay from '@/components/common/overlay'
import { FilterTable, HeadTable } from '@/components/data-table/component'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { DataTable } from '@/components/data-table'
import { Button } from '@/components/ui/button'

import CardStatusEmployee from './_component/index/card-status-employee'
import CardTotalEmployee from './_component/index/card-total-employee'
import ModalDelete from './_component/index/delete-position'
import ModalAdd from './_component/index/add-position'
import { DashboardLayout } from '../../_component/layout'
import { useTitle } from '../../_component/header'
import { links } from './_component/links'

export default function Employee() {
  useTitle(links)

  const [url] = useUrlState({ name: '' })
  const { data, isLoading } = useApiData(
    usePosition({
      ...(url.name !== '' ? { name: url.name } : undefined),
    })
  )

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
            className='w-fit pr-14'
            overlay={
              <Link
                className='absolute right-0 top-1/2 -translate-y-1/2 text-sm text-[#313951] py-1 px-2 rounded-[6px] border border-[#EFF0F2] bg-white hover:shadow-sm hover:shadow-gray-200'
                to={createLinkDetail(PATH.EMPLOYEE_DETAIL, name, id)}
              >
                Lihat
              </Link>
            }
          >
            <div className='hover:text-dark'>
              <Link
                to={createLinkDetail(PATH.EMPLOYEE_DETAIL, name, id)}
                className='justify-start flex'
              >
                <span className='break-words max-w-[120px] text-left'>
                  {name}
                </span>
              </Link>
            </div>
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
            <ProtectedComponent
              required={['position:update', 'position:delete']}
            >
              <DropdownEdit>
                <ProtectedComponent required={['position:update']}>
                  <DropdownMenuItem
                    className='flex items-center gap-2 cursor-pointer rounded-none'
                    onClick={() => {
                      handleDialog('add', true)
                      setSelectedId(row.original.id)
                    }}
                  >
                    Ubah
                  </DropdownMenuItem>
                </ProtectedComponent>
                <ProtectedComponent required={['position:delete']}>
                  <DropdownMenuItem
                    className='flex items-center gap-2 cursor-pointer rounded-none'
                    onClick={() => {
                      handleDialog('delete', true)
                      setSelectedId(row.original.id)
                    }}
                  >
                    Hapus
                  </DropdownMenuItem>
                </ProtectedComponent>
              </DropdownEdit>
            </ProtectedComponent>
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
            <ProtectedComponent required={['position:create']}>
              <Button onClick={() => handleDialog('add', true)}>Tambah</Button>
            </ProtectedComponent>
          </HeadTable>
          <FilterTable placeholder='Cari jabatan' />
          <DataTable
            data={data || []}
            isLoading={isLoading}
            columns={columns}
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

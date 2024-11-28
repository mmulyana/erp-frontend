import useUrlState from '@ahooksjs/use-url-state'
import { Link, useNavigate } from 'react-router-dom'
import { ColumnDef } from '@tanstack/react-table'
import { NetworkIcon } from 'lucide-react'
import { useState } from 'react'

import { createLinkDetail } from '@/utils/create-link-detail'
import { usePosition } from '@/hooks/api/use-position'
import { TEST_ID } from '@/utils/constant/_testId'
import { useApiData } from '@/hooks/use-api-data'
import { PATH } from '@/utils/constant/_paths'

import DropdownEdit from '@/components/common/dropdown-edit'
import ProtectedComponent from '@/components/protected'
import Overlay from '@/components/common/overlay'
import Tour from '@/components/common/tour'
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
import { steps } from './_component/tour-index'
import { links } from './_component/links'
import useTour from '@/hooks/use-tour'

export default function Employee() {
  useTitle(links)
  const navigate = useNavigate()

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
      id: 'name',
      accessorKey: 'name',
      header: 'Nama',
      cell: ({ cell, row }) => {
        const { name, id } = cell.row.original
        return (
          <div
            id={`${TEST_ID.DETAIL_POSITION}-${row.index + 1}`}
            data-testid={`${TEST_ID.DETAIL_POSITION}-${row.index + 1}`}
          >
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
          </div>
        )
      },
    },
    {
      id: 'description',
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
          <div
            className='flex justify-end w-full'
            id={`${TEST_ID.DROPDOWN_EDIT_POSITION}-${row.index + 1}`}
            data-testid={`${TEST_ID.DROPDOWN_EDIT_POSITION}-${row.index + 1}`}
          >
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

  // HANDLE TOUR
  const { start, onTourEnd } = useTour('position')

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
              <Button
                onClick={() => handleDialog('add', true)}
                id={TEST_ID.BUTTON_ADD_POSITION}
                data-testid={TEST_ID.BUTTON_ADD_POSITION}
              >
                Tambah
              </Button>
            </ProtectedComponent>
          </HeadTable>
          <FilterTable placeholder='Cari jabatan' />
          <DataTable
            data={data || []}
            isLoading={isLoading}
            columns={columns}
            clickableColumns={['name', 'description']}
            autoRedirect
            onCellClick={({ name, id }) => {
              navigate(createLinkDetail(PATH.EMPLOYEE_DETAIL, name, id))
            }}
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

      <Tour start={start} onTourEnd={onTourEnd} steps={steps} />
    </DashboardLayout>
  )
}

import { ColumnDef } from '@tanstack/react-table'
import useUrlState from '@ahooksjs/use-url-state'
import { useState } from 'react'

import { useClientPagination } from '@/hooks/api/use-client'
import { useApiData } from '@/hooks/use-api-data'

import { Client as ClientType } from '@/utils/types/api'
import { BASE_URL } from '@/utils/constant/_urls'

import { FilterTable } from '@/components/data-table/component'
import DropdownEdit from '@/components/common/dropdown-edit'
import { DataTable } from '@/components/data-table'
import {
  DropdownMenuGroup,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu'
import DialogAddClient from './dialog-add-client'
import DialogDeleteClient from './dialog-delete-client'

export default function TableClient() {
  const [url] = useUrlState({ name: '', page: '' })
  const { data, isLoading } = useApiData(
    useClientPagination({
      ...(url.name !== '' ? { name: url.name } : undefined),
      ...(url.page !== '' ? { page: url.page } : undefined),
    })
  )

  // COLUMNS CLIENT
  const columns: ColumnDef<ClientType>[] = [
    {
      accessorKey: 'name',
      header: 'Nama',
    },
    {
      accessorKey: 'position',
      header: 'Jabatan',
    },
    {
      id: 'company',
      header: 'Perusahaan',
      cell: ({ row }) => (
        <div className='flex gap-2 items-center min-w-[140px]'>
          {row.original.company && (
            <>
              <img
                className='w-8 h-8 rounded object-cover object-center shadow'
                src={BASE_URL + '/img/' + row.original?.company.logo}
              />
              <p className='text-dark/70'>{row.original.company.name}</p>
            </>
          )}
        </div>
      ),
    },
    {
      accessorKey: 'phone',
      header: 'Kontak',
    },
    {
      accessorKey: 'email',
      header: 'Email',
    },
    {
      id: 'action',
      cell: ({ row }) => (
        <div className='flex justify-end'>
          <DropdownEdit className='-translate-x-3'>
            <DropdownMenuGroup className='px-1'>
              <DropdownMenuItem
                className='flex items-center gap-2 cursor-pointer px-1'
                onClick={() => {
                  setDialog({ id: row.original.id, open: true })
                }}
              >
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                className='flex items-center gap-2 cursor-pointer px-1'
                onClick={() => {
                  setDialogDelete({ id: row.original.id, open: true })
                }}
              >
                Hapus
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownEdit>
        </div>
      ),
    },
  ]

  const [dialog, setDialog] = useState<{
    id: number | null
    open: boolean
  } | null>(null)

  const [dialogDelete, setDialogDelete] = useState<{
    id: number | null
    open: boolean
  } | null>(null)

  return (
    <>
      <FilterTable
        placeholder='Cari klien'
        onAdd={() => setDialog({ id: null, open: true })}
      />
      <DataTable
        columns={columns}
        data={data?.data || []}
        isLoading={isLoading}
        totalPages={data?.total_pages}
        withPagination
      />
      <DialogAddClient
        selectedId={dialog?.id}
        open={dialog?.open || false}
        setOpen={() => {
          setDialog(null)
        }}
      />
      <DialogDeleteClient
        id={dialogDelete?.id}
        open={dialogDelete?.open || false}
        setOpen={() => {
          setDialogDelete(null)
        }}
      />
    </>
  )
}

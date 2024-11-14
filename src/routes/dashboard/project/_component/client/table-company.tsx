import useUrlState from '@ahooksjs/use-url-state'
import { ColumnDef } from '@tanstack/react-table'
import { useState } from 'react'

import { BASE_URL } from '@/utils/constant/_urls'
import { Company } from '@/utils/types/api'

import { useApiData } from '@/hooks/use-api-data'

import DropdownEdit from '@/components/common/dropdown-edit'
import { FilterTable } from '@/components/data-table/component'
import { useClientCompanyPagination } from '@/hooks/api/use-client'
import { DataTable } from '@/components/data-table'
import {
  DropdownMenuGroup,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu'

import DialogAddCompany from './dialog-add-company'
import DialogDeleteCompany from './dialog-delete-company'

export default function TableCompany() {
  const [url] = useUrlState({ name: '', page: '' })
  const { data, isLoading } = useApiData(
    useClientCompanyPagination({
      name: url.name,
      page: url.page,
    })
  )

  // COLUMNS Company
  const columns: ColumnDef<Company>[] = [
    {
      accessorKey: 'name',
      header: 'Nama',
      cell: ({ row }) => (
        <div className='flex gap-1 items-center'>
          <img
            className='w-6 h-6 rounded-full object-cover object-center shadow'
            src={BASE_URL + '/img/' + row.original.logo}
          />
          <p className='text-dark/70'>{row.original.name}</p>
        </div>
      ),
    },
    {
      accessorKey: 'address',
      header: 'Alamat',
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
        placeholder='Cari'
        onAdd={() => setDialog({ id: null, open: true })}
      />
      <DataTable
        columns={columns}
        isLoading={isLoading}
        data={data?.data || []}
        totalPages={data?.total_pages}
        withPagination
      />
      <DialogAddCompany
        selectedId={dialog?.id}
        open={dialog?.open || false}
        setOpen={() => setDialog(null)}
      />
      <DialogDeleteCompany
        id={dialogDelete?.id}
        open={dialogDelete?.open || false}
        setOpen={() => setDialogDelete(null)}
      />
    </>
  )
}

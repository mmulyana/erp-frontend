import useUrlState from '@ahooksjs/use-url-state'
import { ColumnDef } from '@tanstack/react-table'
import { useAtomValue } from 'jotai'
import { useState } from 'react'

import { BASE_URL } from '@/shared/constants/urls'
import { Company } from '@/utils/types/api'

import { useClientCompanyPagination } from '@/hooks/api/use-client'
import { useApiData } from '@/shared/hooks/use-api-data'

import DropdownEdit from '@/components/common/dropdown-edit'
import ProtectedComponent from '@/components/protected'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { FilterTable } from '@/shared/components/data-table/component'
import { DataTable } from '@/shared/components/data-table'
import { permissionAtom } from '@/shared/store/permission'

import DialogDeleteCompany from './dialog-delete-company'
import DialogAddCompany from './dialog-add-company'

export default function TableCompany() {
  const permission = useAtomValue(permissionAtom)

  const [url] = useUrlState({ name: '', page: '' })
  const { data, isLoading } = useApiData(
    useClientCompanyPagination({
      ...(url.name !== '' ? { name: url.name } : undefined),
      ...(url.page !== '' ? { page: url.page } : undefined),
    })
  )

  // COLUMNS Company
  const columns: ColumnDef<Company>[] = [
    {
      accessorKey: 'name',
      header: 'Nama',
      cell: ({ row }) => (
        <div className='flex gap-2 items-center py-2 w-[180px]'>
          {row.original.logo && (
            <img
              className='w-10 h-10 rounded object-cover object-center shadow'
              src={BASE_URL + '/img/' + row.original.logo}
            />
          )}
          <p className='text-dark'>{row.original.name}</p>
        </div>
      ),
    },
    {
      accessorKey: 'address',
      header: 'Alamat',
      cell: ({ row }) => (
        <div className='w-[200px]'>
          <p>{row.original.address}</p>
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
          <ProtectedComponent required={['company:update', 'company:delete']}>
            <DropdownEdit className='-translate-x-3'>
              <ProtectedComponent required={['company:update']}>
                <DropdownMenuItem
                  className='flex items-center gap-2 cursor-pointer px-1'
                  onClick={() => {
                    setDialog({ id: row.original.id, open: true })
                  }}
                >
                  Edit
                </DropdownMenuItem>
              </ProtectedComponent>
              <ProtectedComponent required={['company:delete']}>
                <DropdownMenuItem
                  className='flex items-center gap-2 cursor-pointer px-1'
                  onClick={() => {
                    setDialogDelete({ id: row.original.id, open: true })
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

  const [dialog, setDialog] = useState<{
    id: number | null
    open: boolean
  } | null>(null)

  const [dialogDelete, setDialogDelete] = useState<{
    id: number | null
    open: boolean
  } | null>(null)

  const isAllowed = permission.includes('company:create')

  return (
    <>
      <FilterTable
        placeholder='Cari'
        onAdd={() => setDialog({ id: null, open: true })}
        create={isAllowed}
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

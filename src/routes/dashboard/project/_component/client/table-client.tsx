import { FilterTable } from '@/components/data-table/component'
import DropdownEdit from '@/components/common/dropdown-edit'
import { Client as ClientType } from '@/utils/types/api'
import { DataTable } from '@/components/data-table'
import { useClient } from '@/hooks/api/use-client'
import { ColumnDef } from '@tanstack/react-table'
import { BASE_URL } from '@/utils/constant/_urls'
import {
  DropdownMenuGroup,
  DropdownMenuItem,
} from '@radix-ui/react-dropdown-menu'

type Props = {
  setSelectedId: (val: number) => void
  handleDialog: (type: any, val: boolean) => void
}
export default function TableClient({ setSelectedId, handleDialog }: Props) {
  const { data, isLoading } = useClient()

  // COLUMNS CLIENT
  const columnsClient: ColumnDef<ClientType>[] = [
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
        <div className='flex gap-1 items-center'>
          {row.original.company && (
            <>
              <img
                className='w-6 h-6 rounded-full object-cover object-center shadow'
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
                  setSelectedId(row.original.id)
                  handleDialog('clientAdd', true)
                }}
              >
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                className='flex items-center gap-2 cursor-pointer px-1'
                onClick={() => {
                  setSelectedId(row.original.id)
                  handleDialog('clientDelete', true)
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

  return (
    <>
      <FilterTable placeholder='Cari klien' />
      <DataTable
        columns={columnsClient}
        data={data?.data?.data || []}
        isLoading={isLoading}
        withLoading
        withPagination
      />
    </>
  )
}

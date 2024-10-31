import { FilterTable } from '@/components/data-table/component'
import DropdownEdit from '@/components/common/dropdown-edit'
import { useClientCompany } from '@/hooks/api/use-client'
import { DataTable } from '@/components/data-table'
import { ColumnDef } from '@tanstack/react-table'
import { BASE_URL } from '@/utils/constant/_urls'
import { Company } from '@/utils/types/api'
import {
  DropdownMenuGroup,
  DropdownMenuItem,
} from '@radix-ui/react-dropdown-menu'

type Props = {
  setSelectedId: (val: number) => void
  handleDialog: (type: any, val: boolean) => void
}
export default function TableCompany({ setSelectedId, handleDialog }: Props) {
  const { data, isLoading } = useClientCompany()

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
                  setSelectedId(row.original.id)
                  handleDialog('companyAdd', true)
                }}
              >
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                className='flex items-center gap-2 cursor-pointer px-1'
                onClick={() => {
                  setSelectedId(row.original.id)
                  handleDialog('companyDelete', true)
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
      <FilterTable placeholder='Cari' />
      <DataTable
        columns={columns}
        data={data?.data?.data || []}
        isLoading={isLoading}
        withLoading
        withPagination
      />
    </>
  )
}

import { FilterTable } from '@/components/data-table/component'
import { DashboardLayout } from '../_component/layout'
import { SquareUserRoundIcon, TrashIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Tab, Tabs } from '@/components/tab'
import TitlePage from '../_component/title-page'
import { useClient, useClientCompany } from '@/hooks/api/use-client'
import { ColumnDef } from '@tanstack/react-table'
import { Client as ClientType, Company } from '@/utils/types/api'
import DropdownEdit from '@/components/common/dropdown-edit'
import {
  DropdownMenuGroup,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu'
import { DataTable } from '@/components/data-table'

export default function Client() {
  const qClient = useClient()
  const qClientCompany = useClientCompany()

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
          <img
            className='w-4 h-4 rounded-full object-cover object-center'
            src={row.original.company.logo}
          />
          <p className='text-dark/70'>{row.original.company.name}</p>
        </div>
      ),
    },
    {
      accessorKey: 'contact',
      header: 'Kontak',
    },
    {
      accessorKey: 'email',
      header: 'Email',
    },
    {
      id: 'action',
      cell: () => (
        <div className='flex justify-end'>
          <DropdownEdit>
            <DropdownMenuGroup>
              <DropdownMenuItem className='flex items-center gap-2 cursor-pointer'>
                <TrashIcon className='w-3.5 h-3.5 text-dark/50' />
                Hapus
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownEdit>
        </div>
      ),
    },
  ]
  // COLUMNS Company
  const columnsCompany: ColumnDef<Company>[] = [
    {
      accessorKey: 'name',
      header: 'Nama',
      cell: ({ row }) => (
        <div className='flex gap-1 items-center'>
          <img
            className='w-4 h-4 rounded-full object-cover object-center'
            src={row.original.logo}
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
      accessorKey: 'contact',
      header: 'Kontak',
    },
    {
      accessorKey: 'email',
      header: 'Email',
    },
    {
      id: 'action',
      cell: () => (
        <div className='flex justify-end'>
          <DropdownEdit>
            <DropdownMenuGroup>
              <DropdownMenuItem className='flex items-center gap-2 cursor-pointer'>
                <TrashIcon className='w-3.5 h-3.5 text-dark/50' />
                Hapus
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownEdit>
        </div>
      ),
    },
  ]
  return (
    <DashboardLayout>
      <TitlePage className='mb-2'>
        <div className='flex gap-4 items-center'>
          <SquareUserRoundIcon className='text-[#989CA8]' />
          <p className='text-dark font-medium'>Klien</p>
        </div>
        <div className='flex gap-2 items-center'>
          <Button>Tambah</Button>
        </div>
      </TitlePage>
      <Tabs>
        <Tab label='Klien'>
          <FilterTable placeholder='Cari klien' />
          <DataTable
            columns={columnsClient}
            data={qClient.data?.data?.data || []}
            isLoading={qClient.isLoading}
            withLoading
            withPagination
          />
        </Tab>
        <Tab label='Perusahaan'>
          <FilterTable placeholder='Cari perusahaan' />
          <DataTable
            columns={columnsCompany}
            data={qClientCompany.data?.data?.data || []}
            isLoading={qClientCompany.isLoading}
            withLoading
            withPagination
          />
        </Tab>
      </Tabs>
    </DashboardLayout>
  )
}

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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { DataTable } from '@/components/data-table'
import { useState } from 'react'
import DialogAddClient from './_component/client/dialog-add-client'
import DialogAddCompany from './_component/client/dialog-add-company'
import DialogDeleteCompany from './_component/client/dialog-delete-company'
import DialogDeleteClient from './_component/client/dialog-delete-client'
import { BASE_URL } from '@/utils/constant/_urls'

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
            <DropdownMenuGroup>
              <DropdownMenuItem
                className='flex items-center gap-2 cursor-pointer'
                onClick={() => {
                  setSelectedId(row.original.id)
                  handleDialog('clientDelete', true)
                }}
              >
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
            <DropdownMenuGroup>
              <DropdownMenuItem
                className='flex items-center gap-2 cursor-pointer'
                onClick={() => {
                  setSelectedId(row.original.id)
                  handleDialog('companyDelete', true)
                }}
              >
                <TrashIcon className='w-3.5 h-3.5 text-dark/50' />
                Hapus
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownEdit>
        </div>
      ),
    },
  ]

  // HANDLE DIALOG
  type Dialog = {
    clientAdd: boolean
    clientDelete: boolean
    companyAdd: boolean
    companyDelete: boolean
    dropdown: boolean
  }
  const [dialog, setDialog] = useState<Dialog>({
    clientAdd: false,
    clientDelete: false,
    companyAdd: false,
    companyDelete: false,
    dropdown: false,
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
      <TitlePage className='mb-2'>
        <div className='flex gap-4 items-center'>
          <SquareUserRoundIcon className='text-[#989CA8]' />
          <p className='text-dark font-medium'>Klien</p>
        </div>
        <div className='flex gap-2 items-center'>
          <DropdownMenu
            open={dialog.dropdown}
            onOpenChange={(val) => handleDialog('dropdown', val)}
          >
            <DropdownMenuTrigger>
              <Button>Tambah</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              side='bottom'
              sideOffset={2}
              className='min-w-full -translate-x-[16px] px-0 py-0.5'
            >
              <DropdownMenuItem
                className='rounded-none cursor-pointer'
                onClick={() => {
                  handleDialog('clientAdd', true)
                  handleDialog('dropdown')
                }}
              >
                User baru
              </DropdownMenuItem>
              <DropdownMenuItem
                className='rounded-none cursor-pointer'
                onClick={() => {
                  handleDialog('companyAdd', true)
                  handleDialog('dropdown')
                }}
              >
                Perusahaan baru
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
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
      <DialogAddClient
        open={dialog.clientAdd}
        setOpen={(val) => handleDialog('clientAdd', val)}
      />
      <DialogAddCompany
        open={dialog.companyAdd}
        setOpen={(val) => handleDialog('companyAdd', val)}
      />
      <DialogDeleteCompany
        id={selectedId}
        open={dialog.companyDelete}
        setOpen={(val) => handleDialog('companyDelete', val)}
      />
      <DialogDeleteClient
        id={selectedId}
        open={dialog.clientDelete}
        setOpen={(val) => handleDialog('clientDelete', val)}
      />
    </DashboardLayout>
  )
}

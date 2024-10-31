import { DashboardLayout } from '../_component/layout'
import { SquareUserRoundIcon } from 'lucide-react'
import TitlePage from '../_component/title-page'
import { Button } from '@/components/ui/button'
import { Tab, Tabs } from '@/components/tab'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useState } from 'react'
import DialogDeleteCompany from './_component/client/dialog-delete-company'
import DialogDeleteClient from './_component/client/dialog-delete-client'
import DialogAddCompany from './_component/client/dialog-add-company'
import DialogAddClient from './_component/client/dialog-add-client'
import TableCompany from './_component/client/table-company'
import TableClient from './_component/client/table-client'

export default function Client() {
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
      <div className='px-4'>
        <div className='border border-line rounded-xl overflow-hidden pt-3.5'>
          <Tabs>
            <Tab label='Klien'>
              <TableClient
                setSelectedId={setSelectedId}
                handleDialog={handleDialog}
              />
            </Tab>
            <Tab label='Perusahaan'>
              <TableCompany
                setSelectedId={setSelectedId}
                handleDialog={handleDialog}
              />
            </Tab>
          </Tabs>
        </div>
      </div>
      <DialogAddClient
        selectedId={selectedId}
        open={dialog.clientAdd}
        setOpen={(val) => {
          handleDialog('clientAdd', val)
          setSelectedId(null)
        }}
      />
      <DialogAddCompany
        selectedId={selectedId}
        open={dialog.companyAdd}
        setOpen={(val) => {
          handleDialog('companyAdd', val)
          setSelectedId(null)
        }}
      />
      <DialogDeleteCompany
        id={selectedId}
        open={dialog.companyDelete}
        setOpen={(val) => {
          handleDialog('companyDelete', val)
        }}
      />
      <DialogDeleteClient
        id={selectedId}
        open={dialog.clientDelete}
        setOpen={(val) => {
          handleDialog('clientDelete', val)
        }}
      />
    </DashboardLayout>
  )
}

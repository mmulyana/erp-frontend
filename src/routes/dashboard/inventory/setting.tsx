import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { DashboardLayout } from '../_component/layout'
import { Table2Icon } from 'lucide-react'
import TitlePage from '../_component/title-page'
import { DropdownMenu, DropdownMenuItem } from '@radix-ui/react-dropdown-menu'
import {
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  DataBrand,
  DataCategory,
  DataLocation,
  DataMeasurement,
} from './_component/setting/component'

export default function Settings() {
  // HANDLE DROPDOWN
  const [dropOpen, setDropOpen] = useState(false)

  // HANDLE DIALOG
  type Dialog = {
    brandAdd: boolean
    categoryAdd: boolean
    measurementAdd: boolean
    tagAdd: boolean
  }
  const [dialog, setDialog] = useState<Dialog>({
    brandAdd: false,
    categoryAdd: false,
    measurementAdd: false,
    tagAdd: false,
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
          <Table2Icon className='text-[#989CA8]' />
          <p className='text-dark font-medium'>Pengaturan</p>
        </div>
        <div className='flex gap-2 items-center'>
          <DropdownMenu open={dropOpen} onOpenChange={setDropOpen}>
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
                  handleDialog('brandAdd', true)
                  setDropOpen(false)
                }}
              >
                Tambah Merek
              </DropdownMenuItem>
              <DropdownMenuItem
                className='rounded-none cursor-pointer'
                onClick={() => {
                  handleDialog('categoryAdd', true)
                  setDropOpen(false)
                }}
              >
                Tambah kategori
              </DropdownMenuItem>
              <DropdownMenuItem
                className='rounded-none cursor-pointer'
                onClick={() => {
                  handleDialog('measurementAdd', true)
                  setDropOpen(false)
                }}
              >
                Tambah ukuran
              </DropdownMenuItem>
              <DropdownMenuItem
                className='rounded-none cursor-pointer'
                onClick={() => {
                  handleDialog('tagAdd', true)
                  setDropOpen(false)
                }}
              >
                Tambah tag suppplier
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </TitlePage>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4 p-4'>
        <DataBrand />
        <DataCategory />
        <DataLocation />
        <DataMeasurement />
      </div>
    </DashboardLayout>
  )
}

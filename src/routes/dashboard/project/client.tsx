import { FilterTable } from '@/components/data-table/component'
import { DashboardLayout } from '../_component/layout'
import { SquareUserRoundIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Tab, Tabs } from '@/components/tab'
import TitlePage from '../_component/title-page'
import { useClient } from '@/hooks/api/use-client'

export default function Client() {
  const { data: clients } = useClient()
  console.log(clients)
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
        </Tab>
        <Tab label='Perusahaan'>
          <p>Perusahaan</p>
        </Tab>
      </Tabs>
    </DashboardLayout>
  )
}

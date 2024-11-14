import { PATH } from '@/utils/constant/_paths'
import { Tab, Tabs } from '@/components/tab'

import TableCompany from './_component/client/table-company'
import TableClient from './_component/client/table-client'
import TitlePage from '../_component/title-page'

import { DashboardLayout } from '../_component/layout'
import { useTitle } from '../_component/header'

import { SquareUserRoundIcon } from 'lucide-react'

const links = [
  {
    name: 'Dashboard',
    path: PATH.DASHBOARD_OVERVIEW,
  },
  {
    name: 'Proyek',
    path: PATH.PROJECT_INDEX,
  },
  {
    name: 'klien',
    path: PATH.PROJECT_MANAGE,
  },
]

export default function Client() {
  useTitle(links)

  return (
    <DashboardLayout>
      <TitlePage className='mb-2'>
        <div className='flex gap-4 items-center'>
          <SquareUserRoundIcon className='text-[#989CA8]' />
          <p className='text-dark font-medium'>Klien</p>
        </div>
      </TitlePage>
      <div className='px-4'>
        <div className='border border-line rounded-xl overflow-hidden pt-3.5'>
          <Tabs>
            <Tab label='Klien'>
              <TableClient />
            </Tab>
            <Tab label='Perusahaan'>
              <TableCompany />
            </Tab>
          </Tabs>
        </div>
      </div>
    </DashboardLayout>
  )
}

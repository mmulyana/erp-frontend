import { PATH } from '@/utils/constant/_paths'
import { Tab, Tabs } from '@/components/tab'
import { Overtime, Regular } from './component'
import { useTitle } from '../../_component/header'
import Container from '../../_component/container'
import { DashboardLayout } from '../../_component/layout'
import TitlePage from '../../_component/title-page'
import { FilePenIcon } from 'lucide-react'

const links = [
  {
    name: 'Dashboard',
    path: PATH.DASHBOARD_OVERVIEW,
  },
  {
    name: 'Absensi',
    path: PATH.EMPLOYEE_ATTENDANCE,
  },
]

export default function Page() {
  useTitle(links)

  return (
    <DashboardLayout>
      <TitlePage className='mb-2'>
        <div className='flex gap-4 items-center'>
          <FilePenIcon className='text-[#989CA8]' />
          <p className='text-dark font-medium'>Absensi</p>
        </div>
      </TitlePage>
      <Tabs>
        <Tab label='Reguler'>
          <Regular />
        </Tab>
        <Tab label='Lembur'>
          <Container>
            <Overtime />
          </Container>
        </Tab>
      </Tabs>
    </DashboardLayout>
  )
}

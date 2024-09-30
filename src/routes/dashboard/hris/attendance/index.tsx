import { PATH } from '@/utils/constant/_paths'
import { Tab, Tabs } from '@/components/tab'
import { Header, Overtime, Regular } from './component'
import { useTitle } from '../../_component/header'
import Container from '../../_component/container'
import { DashboardLayout } from '../../_component/layout'

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
      <Container>
        <Header />
      </Container>
      <Tabs>
        <Tab label='Reguler'>
          <Container>
            <Regular />
          </Container>
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

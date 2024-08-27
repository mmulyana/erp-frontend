import { PATH } from '@/utils/constant/_paths'
import { Breadcrumb, Container, DashboardLayout } from '../../component'
import { Tab, Tabs } from '@/components/tab'
import { Header, Overtime, Regular } from './component'

const links = [
  {
    name: 'Dashboard',
    href: PATH.DASHBOARD_OVERVIEW,
  },
  {
    name: 'Absensi',
    href: PATH.EMPLOYEE_ATTENDANCE,
  },
]

export default function Page() {
  return (
    <DashboardLayout>
      <Container>
        <Breadcrumb links={links} />
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

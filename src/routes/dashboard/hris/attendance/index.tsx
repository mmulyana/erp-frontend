import { PATH } from '@/utils/constant/_paths'
import { Breadcrumb, Container, DashboardLayout } from '../../component'
import { Tab, Tabs } from '@/components/tab'

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
      </Container>
      <Tabs>
        <Tab label='Reguler'>
          <Container>Reguler</Container>
        </Tab>
        <Tab label='Lembur'>
          <Container>Lembur</Container>
        </Tab>
      </Tabs>
    </DashboardLayout>
  )
}

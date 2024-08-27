import { Breadcrumb, Container, DashboardLayout } from '../../component'
import CardInfo from '@/components/common/card-info'
import { PATH } from '@/utils/constant/_paths'

const links = [
  {
    name: 'Dashboard',
    href: PATH.DASHBOARD_OVERVIEW,
  },
  {
    name: 'Kasbon',
    href: PATH.EMPLOYEE_CASH_ADVANCES,
  },
]

export default function Page() {
  return (
    <DashboardLayout>
      <Container>
        <Breadcrumb links={links} />
        <div className='max-w-[224px] mt-4'>
          <CardInfo
            title='Jumlah kasbon bulan ini'
            value='Rp 8,000,000'
            percent='16%'
            status='down'
          />
        </div>
      </Container>
    </DashboardLayout>
  )
}

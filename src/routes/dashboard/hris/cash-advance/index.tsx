import { Breadcrumb, Container, DashboardLayout } from '../../component'
import CardInfo from '@/components/common/card-info'
import Filter from '@/components/common/filter'
import Search from '@/components/common/search'
import { DataTable } from '@/components/data-table'
import { Button } from '@/components/ui/button'
import { PATH } from '@/utils/constant/_paths'
import { columns, data } from './component'

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
        <div className='max-w-[224px] mt-4 mb-6'>
          <CardInfo
            title='Jumlah kasbon bulan ini'
            value='Rp 8,000,000'
            percent='16%'
            status='down'
          />
        </div>
        <div className='flex justify-between items-center mb-4'>
          <div className='flex gap-4'>
            <div className='max-w-[180px]'>
              <Search />
            </div>
            <Filter />
          </div>
          <Button className='h-8'>Tambah data</Button>
        </div>
        <DataTable columns={columns} data={data} />
      </Container>
    </DashboardLayout>
  )
}

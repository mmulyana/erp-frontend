import { Breadcrumb, Container, DashboardLayout } from '../../component'
import { DataTable } from '@/components/data-table'
import Search from '@/components/common/search'
import Filter from '@/components/common/filter'
import { Button } from '@/components/ui/button'
import { PATH } from '@/utils/constant/_paths'
import { columns, data } from './component'

const links = [
  {
    name: 'Dashboard',
    href: PATH.DASHBOARD_OVERVIEW,
  },
  {
    name: 'Cuti',
    href: PATH.EMPLOYEE_PAID_LEAVE,
  },
]

export default function Page() {
  return (
    <DashboardLayout>
      <Container>
        <Breadcrumb links={links} />
        <div className='flex justify-between items-center mb-4 mt-6'>
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

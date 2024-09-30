import { DashboardLayout } from '../../component'
import { DataTable } from '@/components/data-table'
import Search from '@/components/common/search'
import Filter from '@/components/common/filter'
import { PATH } from '@/utils/constant/_paths'
import { columns, ModalAdd } from './component'
import { useLeaves } from '@/hooks/api/use-leaves'
import useUrlState from '@ahooksjs/use-url-state'
import { useTitle } from '../../_component/header'
import Container from '../../_component/container'
import Breadcrumb from '../../_component/bread-crumb'

const links = [
  {
    name: 'Dashboard',
    path: PATH.DASHBOARD_OVERVIEW,
  },
  {
    name: 'Cuti',
    path: PATH.EMPLOYEE_PAID_LEAVE,
  },
]

export default function Page() {
  useTitle(links)
  const [url] = useUrlState({ name: '' })
  const { data, isLoading } = useLeaves({
    name: url.name,
  })

  return (
    <DashboardLayout>
      <Container>
        <div className='flex justify-between items-center mb-4'>
          <div className='flex gap-4'>
            <div className='max-w-[180px]'>
              <Search />
            </div>
            <Filter />
            <input
              type='month'
              className='h-8 flex gap-1 items-center border border-[#EFF0F2] rounded-[8px] shadow-md shadow-gray-100 pl-2 pr-1.5'
            />
          </div>
          <ModalAdd />
        </div>
        <DataTable
          columns={columns}
          data={data?.data?.data || []}
          withPagination
          isLoading={isLoading}
        />
      </Container>
    </DashboardLayout>
  )
}

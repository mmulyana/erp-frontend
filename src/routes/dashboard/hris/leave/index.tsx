import {
  Breadcrumb,
  Container,
  DashboardLayout,
  useTitle,
} from '../../component'
import { DataTable } from '@/components/data-table'
import Search from '@/components/common/search'
import Filter from '@/components/common/filter'
import { PATH } from '@/utils/constant/_paths'
import { columns, ModalAdd } from './component'
import { useLeaves } from '@/hooks/use-leaves'
import useUrlState from '@ahooksjs/use-url-state'

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
  useTitle('Cuti')
  const [url] = useUrlState({ name: '' })
  const { data, isLoading } = useLeaves({
    name: url.name,
  })

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

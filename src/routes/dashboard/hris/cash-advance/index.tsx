import { DashboardLayout } from '../../component'
import CardInfo from '@/components/common/card-info'
import Filter from '@/components/common/filter'
import Search from '@/components/common/search'
import { DataTable } from '@/components/data-table'
import { PATH } from '@/utils/constant/_paths'
import { columns, ModalAdd } from './component'
import useUrlState from '@ahooksjs/use-url-state'
import { useCashAdvance } from '@/hooks/use-cash-advance'
import { useTitle } from '../../_component/header'
import Container from '../../_component/container'

const links = [
  {
    name: 'Dashboard',
    path: PATH.DASHBOARD_OVERVIEW,
  },
  {
    name: 'Kasbon',
    path: PATH.EMPLOYEE_CASH_ADVANCES,
  },
]

export default function Page() {
  useTitle(links)

  const [url] = useUrlState({ name: '', page: 1, limit: 10 })

  const { data, isLoading } = useCashAdvance({
    ...(url.name !== '' ? { name: url.name } : undefined),
    limit: url.limit,
    page: url.page,
  })

  return (
    <DashboardLayout>
      <Container>
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
          <ModalAdd />
        </div>
        <DataTable
          columns={columns}
          data={data?.data?.data || []}
          withLoading
          isLoading={isLoading}
        />
      </Container>
    </DashboardLayout>
  )
}

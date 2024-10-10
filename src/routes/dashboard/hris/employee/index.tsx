import { DataTable } from '@/components/data-table'
import { PATH } from '@/utils/constant/_paths'
import { columns, Data, TableHeader } from './component'
import { usePosition } from '@/hooks/api/use-position'
import { useTitle } from '../../_component/header'
import { DashboardLayout } from '../../_component/layout'

const links = [
  {
    name: 'Dashboard',
    path: PATH.DASHBOARD_OVERVIEW,
  },
  {
    name: 'Pegawai',
    path: PATH.EMPLOYEE,
  },
]

export default function Employee() {
  const { data, isLoading } = usePosition()
  useTitle(links)

  return (
    <DashboardLayout>
      <div className='grid grid-cols-1 md:grid-cols-[1fr_340px]'>
        <div>
          <TableHeader />
          <DataTable
            data={data?.data?.data || tableData}
            columns={columns}
            withLoading
            isLoading={isLoading}
          />
        </div>
        <div className='h-[calc(100vh-48px)] border-l border-line'></div>
      </div>
    </DashboardLayout>
  )
}

const tableData: Data[] = [
  {
    id: 1,
    name: 'Staf',
    description: '',
  },
]

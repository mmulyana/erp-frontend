import { DashboardLayout } from '../../component'
import { DataTable } from '@/components/data-table'
import { PATH } from '@/utils/constant/_paths'
import { columns, Data, TableHeader } from './component'
import { usePosition } from '@/hooks/api/use-position'
import Container from '../../_component/container'
import { useTitle } from '../../_component/header'

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
      <Container>
        <TableHeader />
        <DataTable
          data={data?.data?.data || tableData}
          columns={columns}
          withLoading
          isLoading={isLoading}
        />
      </Container>
    </DashboardLayout>
  )
}

const tableData: Data[] = [
  {
    id: 1,
    name: 'Staf',
    description: '',
    _count: {
      employees: 2,
    },
    employees: [
      {
        fullname: 'A',
      },
      {
        fullname: 'B',
      },
    ],
  },
]

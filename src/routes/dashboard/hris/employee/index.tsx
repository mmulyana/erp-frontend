import {
  Breadcrumb,
  Container,
  DashboardLayout,
  useTitle,
} from '../../component'
import { DataTable } from '@/components/data-table'
import { PATH } from '@/utils/constant/_paths'
import { columns, Data, TableHeader } from './component'
import { usePosition } from '@/hooks/use-position'

const links = [
  {
    name: 'Dashboard',
    href: PATH.DASHBOARD_OVERVIEW,
  },
  {
    name: 'Pegawai',
    href: PATH.EMPLOYEE,
  },
]

export default function Employee() {
  const { data, isLoading } = usePosition()
  useTitle('Pegawai')
  return (
    <DashboardLayout>
      <Container>
        <Breadcrumb links={links} />
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

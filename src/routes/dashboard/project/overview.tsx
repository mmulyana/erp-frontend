import { useProject } from '@/hooks/api/use-project'
import { useTitle } from '../_component/header'
import { PATH } from '@/utils/constant/_paths'
import { DashboardLayout } from '../_component/layout'

export default function Dashboard() {
  useTitle([{ name: 'Proyek', path: PATH.PROJECT_INDEX }])

  // const { data, isLoading } = useProject()

  return <DashboardLayout></DashboardLayout>
}

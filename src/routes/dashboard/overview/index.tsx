import { PATH } from '@/utils/constant/_paths'
import { useTitle } from '../_component/header'
import { DashboardLayout } from '../component'

export default function Dashboard() {
  useTitle([{ name: 'Dashboard', path: PATH.DASHBOARD_OVERVIEW }])
  return <DashboardLayout></DashboardLayout>
}

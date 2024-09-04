import { DashboardLayout, useTitle } from '../component'

export default function Dashboard() {
  useTitle('Overview')
  return <DashboardLayout></DashboardLayout>
}

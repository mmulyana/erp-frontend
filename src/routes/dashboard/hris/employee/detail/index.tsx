import { DashboardLayout } from '@/routes/dashboard/component'
import { useParams } from 'react-router-dom'

export default function Detail() {
  const { detail } = useParams()
  
  return (
    <DashboardLayout>
      <p></p>
    </DashboardLayout>
  )
}

import { useProject } from '@/hooks/api/use-project'
import CardProject from '@/components/card-project'
import { Project } from '@/utils/types/api'
import Container from '../_component/container'
import { useTitle } from '../_component/header'
import { PATH } from '@/utils/constant/_paths'
import { DashboardLayout } from '../_component/layout'

export default function Dashboard() {
  useTitle([{ name: 'Proyek', path: PATH.PROJECT_INDEX }])

  const { data } = useProject({})

  return (
    <DashboardLayout>
      <Container>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {data?.data.data.map((project: Project) => (
            <CardProject key={project.id} {...project} />
          ))}
        </div>
      </Container>
    </DashboardLayout>
  )
}

import { useProject } from '@/hooks/use-project'
import { Container, DashboardLayout, useTitle } from '../component'
import CardProject from '@/components/card-project'
import { Project } from '@/utils/types/api'

export default function Dashboard() {
  useTitle('Project')

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

import { useParams } from 'react-router-dom'
import { House } from 'lucide-react'

import ProjectAssignedEmployees from '@/features/projects/project/components/employees/project-assigned-employees'
import ProjectAttachment from '@/features/projects/project/components/project-attachment'
import ProjectDetail from '@/features/projects/project/components/project-detail'
import ProjectInfo from '@/features/projects/project/components/project-info'
import ProjectTabs from '@/features/projects/project/components/project-tabs'
import { CommandSearch } from '@/features/command/components/command-search'
import { useProject } from '@/features/projects/project/api/use-project'

import DetailLayout from '@/shared/layout/detail-layout'
import { useDynamicLinks } from '@/shared/utils/link'
import { paths } from '@/shared/constants/paths'
import { Link } from '@/shared/types'

const links: Link[] = [
	{
		icon: <House size={20} />,
		name: 'Dashboard',
		path: paths.project,
		hideName: true,
	},
	{
		name: 'Proyek',
		path: paths.projectMasterdataProjects,
	},
	{
		name: 'Detail',
		path: paths.projectMasterdataProjectsDetail,
	},
]

export default function DetailProject() {
	const { id } = useParams()

	const { data } = useProject({ id })

	const dynamicLink = useDynamicLinks({
		baseLinks: links,
		replaceName: 'Detail',
		newLink: data?.data
			? {
					name: data.data.name ?? '',
					path: `${paths.projectMasterdataProjects}/${data.data.id}`,
			  }
			: undefined,
		condition: !!(id && data?.data),
	})

	return (
		<DetailLayout
			links={dynamicLink}
			style={{ header: 'w-[1020px]' }}
			buttonAction={<CommandSearch className='w-[200px]' />}
		>
			<div className='grid grid-cols-1 md:grid-cols-[640px_1fr] gap-8 w-[1020px] max-w-full px-4 md:px-0 mx-auto pt-6'>
				<div className='space-y-6'>
					<ProjectInfo id={id} />
					<ProjectDetail id={id} />
					<ProjectTabs id={id} />
				</div>
				<div className='space-y-6'>
					<ProjectAssignedEmployees id={id} />
					<ProjectAttachment id={id} showButton />
				</div>
			</div>
		</DetailLayout>
	)
}

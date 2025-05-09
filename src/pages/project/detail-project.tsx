import { useParams } from 'react-router-dom'
import { House } from 'lucide-react'
import { useMemo } from 'react'

import ProjectAssignedEmployees from '@/features/projects/project/components/project-assigned-employees'
import ProjectAttachment from '@/features/projects/project/components/project-attachment'
import ProjectDetail from '@/features/projects/project/components/project-detail'
import ProjectInfo from '@/features/projects/project/components/project-info'
import ProjectTabs from '@/features/projects/project/components/project-tabs'
import { useProject } from '@/features/projects/project/api/use-project'

import DetailLayout, { Link } from '@/shared/layout/detail-layout'
import { paths } from '@/shared/constants/paths'

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

	const linkMemo: Link[] = useMemo(() => {
		if (!id || !data?.data) return links
		return [
			...links.filter((i) => i.name !== 'Detail'),
			{
				name: data?.data?.name || id,
				path: paths.projectMasterdataProjectsDetail,
			},
		]
	}, [id, data])

	return (
		<DetailLayout links={linkMemo} style={{ header: 'w-[1020px]' }}>
			<div className='grid grid-cols-1 md:grid-cols-[640px_380px] gap-8 w-[1020px] max-w-full px-4 md:px-0 mx-auto pt-6'>
				<div className='space-y-6'>
					<ProjectInfo id={id} />
					<ProjectDetail id={id} />
					<ProjectTabs id={id} />
				</div>
				<div className='space-y-6'>
					<ProjectAssignedEmployees id={id} />
					<ProjectAttachment id={id} />
				</div>
			</div>
		</DetailLayout>
	)
}

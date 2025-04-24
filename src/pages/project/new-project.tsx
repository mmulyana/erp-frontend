import { House } from 'lucide-react'

import FormLayout, { Link } from '@/shared/layout/form-layout'
import { paths } from '@/shared/constants/paths'
import FormNewProject from '@/features/projects/project/components/form-new-project'
import ProgressBar from '@/shared/components/common/progress-bar'
import { useForm } from 'react-hook-form'
import { ProjectForm } from '@/features/projects/project/types'
import { useCreateProject } from '@/features/projects/project/api/use-create-project'
import { useNavigate } from 'react-router-dom'

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
		name: 'Baru',
		path: paths.projectNew,
	},
]

export default function NewProject() {
	const { mutate } = useCreateProject()
	const form = useForm<ProjectForm>()
	const navigate = useNavigate()

	const onSubmit = (payload: ProjectForm) => {
		mutate(payload, {
			onSuccess: (data) => {
				console.log('data', data.data)
				form.reset()
				navigate(
					`${paths.projectMasterdataProjects}/${data.data?.id}` as string
				)
			},
		})
	}

	return (
		<FormLayout
			links={links}
			titleAction='Simpan'
			action={() => form.handleSubmit(onSubmit)()}
		>
			<ProgressBar />
			<FormNewProject form={form} onSubmit={onSubmit} />
		</FormLayout>
	)
}

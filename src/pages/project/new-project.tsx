import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { House } from 'lucide-react'

import FormNewProject from '@/features/projects/project/components/form-new-project'
import ProgressBar from '@/shared/components/common/progress-bar'
import DetailLayout from '@/shared/layout/detail-layout'
import { paths } from '@/shared/constants/paths'
import { Link } from '@/shared/types'

import { useCreateProject } from '@/features/projects/project/api/use-create-project'
import { ProjectForm } from '@/features/projects/project/types'
import { handleFormError } from '@/shared/utils/form'
import { delay } from '@/shared/utils'

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
	const form = useForm<ProjectForm>({
		defaultValues: {
			name: '',
		},
	})
	const navigate = useNavigate()

	const onSubmit = (payload: ProjectForm) => {
		mutate(payload, {
			onSuccess: () => {
				form.reset()
				delay(2000, () => navigate(paths.projectMasterdataProjects))
			},
			onError: handleFormError(form),
		})
	}

	return (
		<DetailLayout
			links={links}
			titleAction='Simpan'
			action={() => form.handleSubmit(onSubmit)()}
		>
			<ProgressBar />
			<FormNewProject form={form} onSubmit={onSubmit} />
		</DetailLayout>
	)
}

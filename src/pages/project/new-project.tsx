import { House } from 'lucide-react'

import FormLayout, { Link } from '@/shared/layout/form-layout'
import { paths } from '@/shared/constants/paths'
import FormNewProject from '@/features/projects/project/components/form-new-project'
import ProgressBar from '@/shared/components/common/progress-bar'

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
	return (
		<FormLayout links={links} titleAction='Simpan'>
			<ProgressBar />
			<FormNewProject />
		</FormLayout>
	)
}

import { useParams } from 'react-router-dom'
import { House } from 'lucide-react'

import ModalDetailClient from '@/features/projects/client/components/modal-detail-client'
import ClientProjects from '@/features/projects/client/components/client-projects'
import CompanyInfo from '@/features/projects/company/components/company-info'
import ClientInfo from '@/features/projects/client/components/client-info'
import { CommandSearch } from '@/features/command/components/command-search'
import { useClient } from '@/features/projects/client/api/use-client'

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
		name: 'Klien',
		path: paths.projectMasterdataClient,
	},
	{
		name: 'Detail',
		path: paths.projectMasterdataClientDetail,
	},
]

export default function DetailClient() {
	const { id } = useParams()

	const { data } = useClient({ id })

	const dynamicLink = useDynamicLinks({
		baseLinks: links,
		replaceName: 'Detail',
		newLink: data?.data
			? {
					name: data.data.name ?? '',
					path: `${paths.projectMasterdataClient}/${data.data.id}`,
			  }
			: undefined,
		condition: !!(id && data?.data),
	})

	return (
		<DetailLayout
			links={dynamicLink}
			style={{ header: 'w-[960px]' }}
			buttonAction={<CommandSearch />}
		>
			<div className='grid grid-cols-1 md:grid-cols-[320px_1fr] gap-6 w-[960px] max-w-full px-4 md:px-0 mx-auto pt-6'>
				<div className='space-y-6'>
					<ClientInfo id={id} />
					<CompanyInfo
						id={data?.data?.companyId || ''}
						action={<ModalDetailClient variant='company' />}
					/>
				</div>
				<div className='space-y-6'>
					<ClientProjects id={id} />
				</div>
			</div>
		</DetailLayout>
	)
}

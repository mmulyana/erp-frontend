import { useParams } from 'react-router-dom'
import { House } from 'lucide-react'
import { useMemo } from 'react'

import CardInformation from '@/features/hris/employee/components/detail/card-information'
import CardPosition from '@/features/hris/employee/components/detail/card-position'
import CardAddress from '@/features/hris/employee/components/detail/card-address'
import CardDetail from '@/features/hris/employee/components/detail/card-detail'
import { useEmployee } from '@/features/hris/employee/api/use-employee'

import DetailLayout from '@/shared/layout/detail-layout'
import { paths } from '@/shared/constants/paths'
import { Link } from '@/shared/types'
import { useDynamicLinks } from '@/shared/utils/link'
import { CommandSearch } from '@/features/command/components/command-search'

const links: Link[] = [
	{
		icon: <House size={20} />,
		name: 'Dashboard',
		path: paths.hris,
		hideName: true,
	},
	{
		name: 'Pegawai',
		path: paths.hrisMasterdataEmployee,
	},
	{
		name: 'Detail',
		path: paths.hrisMasterdataEmployeeCreate,
	},
]

export default function DetailEmployee() {
	const { id } = useParams()

	const { data } = useEmployee(id)

	const dynamicLink = useDynamicLinks({
		baseLinks: links,
		replaceName: 'Detail',
		newLink: data?.fullname
			? {
					name: data.fullname ?? '',
					path: `${paths.hrisMasterdataEmployee}/${data.id}`,
			  }
			: undefined,
		condition: !!(id && data),
	})

	return (
		<DetailLayout
			links={dynamicLink}
			style={{ header: 'w-[1200px]' }}
			buttonAction={<CommandSearch className='w-[200px]' />}
		>
			<div className='mx-auto pt-6 px-6 lg:px-0 w-[1200px] max-w-full'>
				<div className='grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-6'>
					<div className='space-y-6'>
						<CardInformation />
						<CardAddress />
					</div>
					<div className='space-y-6'>
						<CardPosition />
						<CardDetail />
					</div>
				</div>
			</div>
		</DetailLayout>
	)
}

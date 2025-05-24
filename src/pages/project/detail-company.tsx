import { useParams } from 'react-router-dom'
import { House } from 'lucide-react'

import ModalAddClient from '@/features/projects/client/components/modal-add-client'
import CompanyInfo from '@/features/projects/company/components/company-info'
import TableClient from '@/features/projects/client/components/table-client'
import { useCompany } from '@/features/projects/company/api/use-company'

import CreatedSelect from '@/shared/components/common/select/created-select'
import FilterButton from '@/shared/components/common/filter-button'
import SortButton from '@/shared/components/common/sort-button'
import HeadPage from '@/shared/components/common/head-page'
import SearchV3 from '@/shared/components/common/search-v3'
import DetailLayout from '@/shared/layout/detail-layout'

import { useDynamicLinks } from '@/shared/utils/link'
import { paths } from '@/shared/constants/paths'
import { Link } from '@/shared/types'
import ModalDetailCompany from '@/features/projects/company/components/modal-detail-company'

const links: Link[] = [
	{
		icon: <House size={20} />,
		name: 'Dashboard',
		path: paths.project,
		hideName: true,
	},
	{
		name: 'Perusahaan',
		path: paths.projectMasterdataClientCompany,
	},
	{
		name: 'Detail',
		path: paths.projectMasterdataClientCompanyDetail,
	},
]

export default function DetailCompany() {
	const { id } = useParams()

	const { data } = useCompany({ id })

	const dynamicLink = useDynamicLinks({
		baseLinks: links,
		replaceName: 'Detail',
		newLink: data?.data
			? {
					name: data.data.name ?? '',
					path: `${paths.projectMasterdataClientCompany}/${data.data.id}`,
			  }
			: undefined,
		condition: !!(id && data?.data),
	})

	return (
		<DetailLayout links={dynamicLink} style={{ header: 'w-[960px]' }}>
			<div className='grid grid-cols-1 md:grid-cols-[320px_1fr] gap-6 w-[960px] max-w-full px-4 md:px-0 mx-auto pt-6'>
				<div className='space-y-6'>
					<CompanyInfo id={id} action={<ModalDetailCompany />} />
				</div>
				<div className='space-y-6'>
					<HeadPage
						title='Klien'
						subtitle='Lihat pegawai perusahaan klien'
						action={<ModalAddClient companyId={id} />}
					/>
					<div className='p-6 rounded-xl bg-white border border-border space-y-6'>
						<div className='flex items-center gap-4 flex-wrap'>
							<SearchV3 />
							<SortButton style={{ trigger: 'ml-0 md:ml-auto' }}>
								<CreatedSelect />
							</SortButton>
						</div>
						<TableClient companyId={id} />
					</div>
				</div>
			</div>
		</DetailLayout>
	)
}

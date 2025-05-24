import FilterButton from '@/shared/components/common/filter-button'
import SortButton from '@/shared/components/common/sort-button'
import { DefaultLayout } from '@/shared/layout/default-layout'
import HeadPage from '@/shared/components/common/head-page'
import SearchV3 from '@/shared/components/common/search-v3'

import ModalAddCompany from '@/features/projects/company/components/modal-add-company'
import TableCompany from '@/features/projects/company/components/table-company'

export default function Company() {
	return (
		<DefaultLayout className='space-y-6' module='project'>
			<HeadPage
				title='Perusahaan'
				subtitle='Kelola data perusahaan klien'
				action={<ModalAddCompany />}
			/>
			<div className='bg-white p-6 space-y-6 rounded-xl border border-border'>
				<div className='flex justify-between items-center'>
					<SearchV3 />
					<div className='flex gap-4 items-center'>
						<FilterButton></FilterButton>
						<SortButton></SortButton>
					</div>
				</div>
				<TableCompany />
			</div>
		</DefaultLayout>
	)
}

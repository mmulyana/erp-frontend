import FilterButton from '@/shared/components/common/filter-button'
import SortButton from '@/shared/components/common/sort-button'
import { DefaultLayout } from '@/shared/layout/default-layout'
import SearchV3 from '@/shared/components/common/search-v3'
import HeadPage from '@/shared/components/common/head-page'

import ModalDetailClient from '@/features/projects/client/components/modal-detail-client'
import ModalAddClient from '@/features/projects/client/components/modal-add-client'
import TableClient from '@/features/projects/client/components/table-client'

export default function Client() {
	return (
		<DefaultLayout className='space-y-6' module='project'>
			<HeadPage
				title='Klien'
				subtitle='Kelola data klien'
				action={<ModalAddClient />}
			/>
			<div className='p-6 rounded-xl bg-white border border-border space-y-6'>
				<div className='flex justify-between items-center'>
					<SearchV3 />
					<div className='flex gap-4 items-center'>
						<FilterButton></FilterButton>
						<SortButton></SortButton>
					</div>
				</div>
				<TableClient />
			</div>
			<ModalDetailClient />
		</DefaultLayout>
	)
}

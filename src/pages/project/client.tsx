import FilterButton from '@/shared/components/common/filter-button'
import SortButton from '@/shared/components/common/sort-button'
import { DefaultLayout } from '@/shared/layout/default-layout'
import SearchV3 from '@/shared/components/common/search-v3'
import HeadPage from '@/shared/components/common/head-page'

import ModalAddClient from '@/features/projects/client/components/modal-add-client'
import TableClient from '@/features/projects/client/components/table-client'
import CreatedSelect from '@/shared/components/common/select/created-select'

export default function Client() {
	return (
		<DefaultLayout className='space-y-6' module='project'>
			<HeadPage
				title='Klien'
				subtitle='Kelola data klien'
				action={<ModalAddClient />}
			/>
			<div className='p-6 rounded-xl bg-white border border-border space-y-6'>
				<div className='flex items-center gap-4 flex-wrap'>
					<SearchV3 />
					<FilterButton style={{ trigger: 'ml-0 md:ml-auto' }}></FilterButton>
					<SortButton>
						<CreatedSelect />
					</SortButton>
				</div>
				<TableClient />
			</div>
		</DefaultLayout>
	)
}

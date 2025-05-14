import { DefaultLayout } from '@/shared/layout/default-layout'
import SearchV3 from '@/shared/components/common/search-v3'

import ModalDetailBrand from '@/features/inventory/brand/components/modal-detail-brand'
import ModalAddBrand from '@/features/inventory/brand/components/modal-add-brand'
import TableBrand from '@/features/inventory/brand/components/table-brand'
import FilterButton from '@/shared/components/common/filter-button'
import SortButton from '@/shared/components/common/sort-button'
import HeadPage from '@/shared/components/common/head-page'

export default function Brand() {
	return (
		<DefaultLayout className='space-y-6' module='inventory'>
			<HeadPage
				title='Merek'
				subtitle='Kelola data merek'
				action={<ModalAddBrand />}
			/>

			<div className='p-6 rounded-xl border borde-border bg-white space-y-6'>
				<div className='flex justify-between items-center'>
					<SearchV3 />
					<div className='flex gap-4 items-center'>
						<FilterButton></FilterButton>
						<SortButton></SortButton>
					</div>
				</div>
				<TableBrand />
			</div>
		</DefaultLayout>
	)
}

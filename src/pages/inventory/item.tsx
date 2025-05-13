import ItemAvailability from '@/features/inventory/item/components/item-availability'
import ModalAddItem from '@/features/inventory/item/components/modal-add-item'
import TableItem from '@/features/inventory/item/components/table-item'

import { DefaultLayout } from '@/shared/layout/default-layout'
import FilterButton from '@/shared/components/common/filter-button'
import SortButton from '@/shared/components/common/sort-button'
import HeadPage from '@/shared/components/common/head-page'
import SearchV3 from '@/shared/components/common/search-v3'

export default function Item() {
	return (
		<DefaultLayout className='space-y-6' module='inventory'>
			<ItemAvailability variant='compact' />

			<HeadPage
				title='Barang'
				subtitle='Kelola data barang'
				action={<ModalAddItem />}
			/>

			<div className='p-6 rounded-xl border borde-border bg-white space-y-6'>
				<div className='flex justify-between items-center'>
					<SearchV3 />
					<div className='flex gap-4 items-center'>
						<FilterButton></FilterButton>
						<SortButton></SortButton>
					</div>
				</div>
				<TableItem />
			</div>
		</DefaultLayout>
	)
}

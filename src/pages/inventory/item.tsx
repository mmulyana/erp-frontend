import { DefaultLayout } from '@/shared/layout/default-layout'
import SearchV3 from '@/shared/components/common/search-v3'

import ModalAddItem from '@/features/inventory/item/components/modal-add-item'
import TableItem from '@/features/inventory/item/components/table-item'

export default function Item() {
	return (
		<DefaultLayout className='px-0 pt-12' module='inventory'>
			<div className='flex justify-between items-center p-6'>
				<SearchV3 />
				<ModalAddItem />
			</div>
			<TableItem />
		</DefaultLayout>
	)
}

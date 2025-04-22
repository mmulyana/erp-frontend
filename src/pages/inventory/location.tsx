import { DefaultLayout } from '@/shared/layout/default-layout'
import SearchV3 from '@/shared/components/common/search-v3'

import ModalDetailLocation from '@/features/inventory/location/components/modal-detail-location'
import ModalAddLocation from '@/features/inventory/location/components/modal-add-location'
import TableLocation from '@/features/inventory/location/components/table-location'

export default function Location() {
	return (
		<DefaultLayout className='px-0 pt-12' module='inventory'>
			<div className='flex justify-between items-center p-6'>
				<SearchV3 />
				<ModalAddLocation />
			</div>
			<TableLocation />
			<ModalDetailLocation />
		</DefaultLayout>
	)
}

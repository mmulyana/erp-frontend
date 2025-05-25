import { DefaultLayout } from '@/shared/layout/default-layout'
import SearchV3 from '@/shared/components/common/search-v3'

import ModalAddLocation from '@/features/inventory/location/components/modal-add-location'
import TableLocation from '@/features/inventory/location/components/table-location'
import CreatedSelect from '@/shared/components/common/select/created-select'
import SortButton from '@/shared/components/common/sort-button'
import HeadPage from '@/shared/components/common/head-page'

export default function Location() {
	return (
		<DefaultLayout className='space-y-6' module='inventory'>
			<HeadPage
				title='Gudang'
				subtitle='Kelola data gudang'
				action={<ModalAddLocation />}
			/>

			<div className='p-6 rounded-xl border borde-border bg-white space-y-6'>
				<div className='flex justify-between items-center'>
					<SearchV3 />
					<div className='flex gap-4 items-center'>
						<SortButton>
							<CreatedSelect />
						</SortButton>
					</div>
				</div>
				<TableLocation />
			</div>
		</DefaultLayout>
	)
}

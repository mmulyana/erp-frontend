import { DefaultLayout } from '@/shared/layout/default-layout'
import SearchV3 from '@/shared/components/common/search-v3'

import ModalAddBrand from '@/features/inventory/brand/components/modal-add-brand'
import CreatedSelect from '@/shared/components/common/select/created-select'
import TableBrand from '@/features/inventory/brand/components/table-brand'
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
				<div className='flex gap-4 items-center'>
					<SearchV3 />
					<SortButton style={{ trigger: 'ml-auto' }}>
						<CreatedSelect />
					</SortButton>
				</div>
				<TableBrand />
			</div>
		</DefaultLayout>
	)
}

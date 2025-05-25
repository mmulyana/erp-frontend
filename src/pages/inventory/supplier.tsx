import SortButton from '@/shared/components/common/sort-button'
import SearchV3 from '@/shared/components/common/search-v3'
import HeadPage from '@/shared/components/common/head-page'
import { DefaultLayout } from '@/shared/layout/default-layout'

import ModalAddSupplier from '@/features/inventory/supplier/components/modal-add-supplier'
import TableSupplier from '@/features/inventory/supplier/components/table-supplier'
import CreatedSelect from '@/shared/components/common/select/created-select'

export default function Supplier() {
	return (
		<DefaultLayout module='inventory' className='space-y-6'>
			<HeadPage
				title='Supplier'
				subtitle='Kelola data supplier'
				action={<ModalAddSupplier />}
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
				<TableSupplier />
			</div>
		</DefaultLayout>
	)
}

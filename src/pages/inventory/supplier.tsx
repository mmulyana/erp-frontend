import { parseAsString, useQueryStates } from 'nuqs'

import SortButton from '@/shared/components/common/sort-button'
import SearchV3 from '@/shared/components/common/search-v3'
import HeadPage from '@/shared/components/common/head-page'
import { DefaultLayout } from '@/shared/layout/default-layout'

import ModalAddSupplier from '@/features/inventory/supplier/components/modal-add-supplier'
import TableSupplier from '@/features/inventory/supplier/components/table-supplier'
import CreatedSelect from '@/shared/components/common/select/created-select'
import FilterReset from '@/shared/components/common/filter-reset'
import { useHasQueryValue } from '@/shared/hooks/use-has-query'
import ProtectedComponent from '@/shared/components/common/protected'
import { permissions } from '@/shared/constants/permissions'

export default function Supplier() {
	const [query, setQuery] = useQueryStates({
		sort: parseAsString.withDefault(''),
	})

	const hasQuery = useHasQueryValue(query)

	return (
		<DefaultLayout module='inventory' className='space-y-6'>
			<HeadPage
				title='Supplier'
				subtitle='Kelola data supplier'
				action={
					<ProtectedComponent required={[permissions.supplier_create]}>
						<ModalAddSupplier />
					</ProtectedComponent>
				}
			/>

			<div className='p-6 rounded-xl border borde-border bg-white space-y-6'>
				<div className='flex justify-between items-center gap-4'>
					<SearchV3 />
					<FilterReset
						show={hasQuery}
						onClick={() =>
							setQuery({
								sort: null,
							})
						}
					/>
					<SortButton style={{ trigger: 'ml-0 md:ml-auto' }}>
						<CreatedSelect />
					</SortButton>
				</div>
				<TableSupplier />
			</div>
		</DefaultLayout>
	)
}

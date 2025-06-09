import { DefaultLayout } from '@/shared/layout/default-layout'
import SearchV3 from '@/shared/components/common/search-v3'

import ModalAddBrand from '@/features/inventory/brand/components/modal-add-brand'
import CreatedSelect from '@/shared/components/common/select/created-select'
import TableBrand from '@/features/inventory/brand/components/table-brand'
import SortButton from '@/shared/components/common/sort-button'
import HeadPage from '@/shared/components/common/head-page'
import { parseAsString, useQueryStates } from 'nuqs'
import { useHasQueryValue } from '@/shared/hooks/use-has-query'
import FilterReset from '@/shared/components/common/filter-reset'

export default function Brand() {
	const [query, setQuery] = useQueryStates({
		sort: parseAsString.withDefault(''),
	})

	const hasQuery = useHasQueryValue(query)

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
				<TableBrand />
			</div>
		</DefaultLayout>
	)
}

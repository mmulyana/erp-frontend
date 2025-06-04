import { DefaultLayout } from '@/shared/layout/default-layout'
import SearchV3 from '@/shared/components/common/search-v3'

import ModalAddCashAdvance from '@/features/hris/cash-advance/components/modal-add-cash-advance'
import TableCashAdvance from '@/features/hris/cash-advance/components/table-cash-advance'
import CashAdvanceTotal from '@/features/hris/cash-advance/components/cash-advance-total'
import FilterButton from '@/shared/components/common/filter-button'
import SortButton from '@/shared/components/common/sort-button'
import HeadPage from '@/shared/components/common/head-page'
import FilterEmployee from '@/features/hris/employee/components/filter-employee'
import CreatedSelect from '@/shared/components/common/select/created-select'
import { parseAsString, useQueryStates } from 'nuqs'
import { useHasQueryValue } from '@/shared/hooks/use-has-query'
import FilterReset from '@/shared/components/common/filter-reset'

export default function CashAdvancePage() {
	const [query, setQuery] = useQueryStates({
		position: parseAsString.withDefault(''),
		sort: parseAsString.withDefault(''),
	})

	const hasValue = useHasQueryValue(query)

	return (
		<DefaultLayout module='hris' className='space-y-6'>
			<CashAdvanceTotal />
			<HeadPage
				title='Kasbon'
				subtitle='Kelola kasbon pegawai'
				action={<ModalAddCashAdvance />}
			/>
			<div className='bg-white rounded-xl border border-border p-6 space-y-6'>
				<div className='flex items-center flex-wrap gap-4 w-full'>
					<SearchV3 />
					<FilterReset
						show={hasValue}
						onClick={() =>
							setQuery({
								position: null,
								sort: null,
							})
						}
					/>
					<FilterEmployee hideFilter={['active', 'lastEdu']} />
					<SortButton>
						<CreatedSelect />
					</SortButton>
				</div>
				<TableCashAdvance />
			</div>
		</DefaultLayout>
	)
}

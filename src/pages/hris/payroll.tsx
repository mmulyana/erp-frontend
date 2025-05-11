import TablePayroll from '@/features/hris/payroll/components/table-payroll'

import FilterButton from '@/shared/components/common/filter-button'
import SortButton from '@/shared/components/common/sort-button'
import SearchV3 from '@/shared/components/common/search-v3'
import { DefaultLayout } from '@/shared/layout/default-layout'

export default function Payroll() {
	return (
		<DefaultLayout module='hris'>
			<div className='space-y-6'>
				<div className='p-6 rounded-xl border-border bg-white space-y-6'>
					<div className='flex justify-between items-center'>
						<SearchV3 />
						<div className='flex gap-4 items-center'>
							<FilterButton></FilterButton>
							<SortButton></SortButton>
						</div>
					</div>
					<TablePayroll />
				</div>
			</div>
		</DefaultLayout>
	)
}

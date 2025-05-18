import { DefaultLayout } from '@/shared/layout/default-layout'
import SearchV3 from '@/shared/components/common/search-v3'

import ModalAddCashAdvance from '@/features/hris/cash-advance/components/modal-add-cash-advance'
import TableCashAdvance from '@/features/hris/cash-advance/components/table-cash-advance'
import CashAdvanceTotal from '@/features/hris/cash-advance/components/cash-advance-total'
import FilterButton from '@/shared/components/common/filter-button'
import SortButton from '@/shared/components/common/sort-button'
import HeadPage from '@/shared/components/common/head-page'

export default function CashAdvancePage() {
	return (
		<DefaultLayout module='hris' className='space-y-6'>
			<CashAdvanceTotal />
			<HeadPage
				title='Kasbon'
				subtitle='Kelola kasbon pegawai'
				action={<ModalAddCashAdvance />}
			/>
			<div className='bg-white rounded-xl border border-border p-6 space-y-6'>
				<div className='flex justify-between items-center flex-col md:flex-row gap-4 w-full'>
					<div className='flex gap-4 items-start md:items-center w-full md:w-fit flex-col md:flex-row'>
						<SearchV3 />
					</div>
					<div className='flex justify-end w-full gap-4'>
						<FilterButton></FilterButton>
						<SortButton></SortButton>
					</div>
				</div>
				<TableCashAdvance />
			</div>
		</DefaultLayout>
	)
}

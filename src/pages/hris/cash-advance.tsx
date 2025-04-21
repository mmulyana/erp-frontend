import { DefaultLayout } from '@/shared/layout/default-layout'
import SearchV3 from '@/shared/components/common/search-v3'

import ModalAddCashAdvance from '@/features/hris/cash-advance/components/modal-add-cash-advance'
import TableCashAdvance from '@/features/hris/cash-advance/components/table-cash-advance'
import ModalDetailCashAdvance from '@/features/hris/cash-advance/components/modal-detail-cash-advance'
import { ScrollArea, ScrollBar } from '@/shared/components/ui/scroll-area'

export default function CashAdvancePage() {
	return (
		<DefaultLayout className='px-0 py-12' module='hris'>
			<div className='p-6 flex justify-between items-center flex-col md:flex-row gap-4 w-full'>
				<div className='flex gap-4 items-start md:items-center w-full md:w-fit flex-col md:flex-row'>
					<SearchV3 />
				</div>
				<div className='flex justify-end w-full'>
					<ModalAddCashAdvance />
				</div>
			</div>
			<ScrollArea className='w-screen md:w-full'>
				<TableCashAdvance />
				<ScrollBar className='absolute top-0' />
			</ScrollArea>
			<ModalDetailCashAdvance />
		</DefaultLayout>
	)
}

import { Plus } from 'lucide-react'

import { HrisLayout } from '@/shared/layout/hris-layout'
import { Button } from '@/shared/components/ui/button'
import SearchV3 from '@/shared/components/search-v3'

import TableCashAdvance from '@/features/hris/cash-advance/components/table-cash-advance'
import ModalAddCashAdvance from '@/features/hris/cash-advance/components/modal-add-cash-advance'

export default function CashAdvancePage() {
	return (
		<HrisLayout className='px-0 py-12'>
			<div className='p-6 flex justify-between items-center'>
				<div className='flex gap-4 items-center'>
					<SearchV3 />
				</div>
				<ModalAddCashAdvance />
			</div>
			<TableCashAdvance />
		</HrisLayout>
	)
}

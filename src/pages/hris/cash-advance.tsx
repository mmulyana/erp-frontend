import { Plus } from 'lucide-react'

import { Button } from '@/components/ui/button'

import { HrisLayout } from '@/shared/layout/hris-layout'
import SearchV3 from '@/shared/component/search-v3'
import TableCashAdvance from '@/features/hris/cash-advance/components/table-cash-advance'

export default function CashAdvancePage() {
	return (
		<HrisLayout className='px-0 py-12'>
			<div className='p-6 flex justify-between items-center'>
				<div className='flex gap-4 items-center'>
					<SearchV3 />
				</div>
				<Button className='gap-2'>
					<Plus strokeWidth={2} size={16} className='text-white' />
					<span className='px-0.5'>Tambah Kasbon</span>
				</Button>
			</div>
			<TableCashAdvance />
		</HrisLayout>
	)
}

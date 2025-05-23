import { parseAsIsoDate, useQueryStates } from 'nuqs'

import { LineTransaction } from '@/features/inventory/ledger/components/line-transaction'
import TableTransaction from '@/features/inventory/ledger/components/table-transaction'
import ItemAvailability from '@/features/inventory/item/components/item-availability'
import ItemDueSoon from '@/features/inventory/dashboard/components/item-due-soon'
import DateRangePicker from '@/shared/components/common/date-range-picker'
import PieLoan from '@/features/inventory/loan/components/pie-loan'

import { DefaultLayout } from '@/shared/layout/default-layout'
import { useWeek } from '@/shared/hooks/use-week'
import TotalData from '@/features/inventory/dashboard/components/total-data'

export default function DashboardInventory() {
	const { startOfWeek, endOfWeek } = useWeek()

	const [{ startDate, endDate }] = useQueryStates({
		startDate: parseAsIsoDate.withDefault(startOfWeek),
		endDate: parseAsIsoDate.withDefault(endOfWeek),
	})

	return (
		<DefaultLayout
			className='grid grid-cols-1 xl:grid-cols-[1fr_400px] gap-6'
			module='inventory'
		>
			<div className='space-y-6'>
				<div className='h-fit space-y-6'>
					<TotalData />
					<div className='flex justify-end'>
						<DateRangePicker />
					</div>
					<LineTransaction startDate={startDate} endDate={endDate} />
					<TableTransaction startDate={startDate} endDate={endDate} />
				</div>
			</div>
			<div className='space-y-6'>
				<ItemAvailability />
				<ItemDueSoon />
				<PieLoan />
			</div>
		</DefaultLayout>
	)
}

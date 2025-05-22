import { Hammer, Store, Warehouse } from 'lucide-react'
import { parseAsIsoDate, useQueryStates } from 'nuqs'

import { LineTransaction } from '@/features/inventory/ledger/components/line-transaction'
import TableTransaction from '@/features/inventory/ledger/components/table-transaction'

import ItemAvailability from '@/features/inventory/item/components/item-availability'
import ItemDueSoon from '@/features/inventory/dashboard/components/item-due-soon'
import DateRangePicker from '@/shared/components/common/date-range-picker'
import PieLoan from '@/features/inventory/loan/components/pie-loan'
import CardV1 from '@/shared/components/common/card-v1'

import { DefaultLayout } from '@/shared/layout/default-layout'
import { useWeek } from '@/shared/hooks/use-week'

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
				<div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
					<CardV1
						title='Total Barang'
						icon={<Hammer size={20} className='text-ink-primary' />}
						style={{
							content: 'text-right pb-4',
						}}
					>
						<p className='text-2xl font-medium text-ink-primary'>140</p>
					</CardV1>
					<CardV1
						title='Gudang'
						icon={<Warehouse size={20} className='text-ink-primary' />}
						style={{
							content: 'text-right pb-4',
						}}
					>
						<p className='text-2xl font-medium text-ink-primary'>4</p>
					</CardV1>
					<CardV1
						title='Supplier'
						icon={<Store size={20} className='text-ink-primary' />}
						style={{
							content: 'text-right pb-4',
						}}
					>
						<p className='text-2xl font-medium text-ink-primary'>14</p>
					</CardV1>
				</div>
				<div className='h-fit space-y-6'>
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

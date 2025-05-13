import { Hammer, Store, Warehouse } from 'lucide-react'

import { LineTransaction } from '@/features/inventory/dashboard/components/line-transaction'
import TableTransaction from '@/features/inventory/dashboard/components/table-transaction'

import ItemAvailability from '@/features/inventory/item/components/item-availability'
import ItemDueSoon from '@/features/inventory/dashboard/components/item-due-soon'
import DateRangePicker from '@/shared/components/common/date-range-picker'
import PieLoan from '@/features/inventory/loan/components/pie-loan'
import CardV1 from '@/shared/components/common/card-v1'
import { DefaultLayout } from '@/shared/layout/default-layout'

export default function DashboardInventory() {
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
					<LineTransaction />
					<TableTransaction />
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

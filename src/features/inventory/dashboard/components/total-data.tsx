import { Hammer, Store, Warehouse } from 'lucide-react'
import CardV1 from '@/shared/components/common/card-v1'
import { useTotalItem } from '../../item/api/use-total-item'
import { useTotalWarehouse } from '../../location/api/use-total-warehouse'
import { useTotalSupplier } from '../../supplier/api/use-total-supplier'

export default function TotalData() {
	const { data: item } = useTotalItem()
	const { data: warehouse } = useTotalWarehouse()
	const { data: supplier } = useTotalSupplier()

	return (
		<div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
			<CardV1
				title='Total Barang'
				icon={<Hammer size={20} className='text-ink-primary' />}
				style={{
					content: 'text-right pb-4',
				}}
			>
				<p className='text-2xl font-medium text-ink-primary'>{item?.data}</p>
			</CardV1>
			<CardV1
				title='Gudang'
				icon={<Warehouse size={20} className='text-ink-primary' />}
				style={{
					content: 'text-right pb-4',
				}}
			>
				<p className='text-2xl font-medium text-ink-primary'>
					{warehouse?.data}
				</p>
			</CardV1>
			<CardV1
				title='Supplier'
				icon={<Store size={20} className='text-ink-primary' />}
				style={{
					content: 'text-right pb-4',
				}}
			>
				<p className='text-2xl font-medium text-ink-primary'>
					{supplier?.data}
				</p>
			</CardV1>
		</div>
	)
}

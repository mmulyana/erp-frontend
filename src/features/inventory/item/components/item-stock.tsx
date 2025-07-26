import { Database } from 'lucide-react'
import CardV1 from '@/shared/components/common/card-v1'

import { useItem } from '../api/use-item'

type props = {
	id?: string
}
export default function ItemStock({ id }: props) {
	const { data } = useItem({ id })

	const isMaterial = data?.data.type === 'material'

	return (
		<CardV1
			title='Kuantitas'
			icon={<Database size={20} className='text-ink-primary' />}
			style={{ content: 'pt-4 space-y-4' }}
		>
			<div>
				<p className='text-ink-light'>{isMaterial ? 'Tersisa' : 'Tersedia'}</p>
				<p className='text-ink-secondary text-2xl font-medium'>
					{data?.data?.totalStock} {data?.data?.unitOfMeasurement}
				</p>
			</div>
			{!isMaterial && (
				<div>
					<p className='text-ink-light'>Tersisa</p>
					<p className='text-ink-secondary text-2xl font-medium'>
						{data?.data?.availableStock}
					</p>
				</div>
			)}
		</CardV1>
	)
}

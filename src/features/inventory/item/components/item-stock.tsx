import { Card } from '@/shared/components/ui/card'
import { useItem } from '../api/use-item'
import CardV1 from '@/shared/components/common/card-v1'
import { Database } from 'lucide-react'

type props = {
	id?: string
}
export default function ItemStock({ id }: props) {
	const { data } = useItem({ id })
	return (
		<CardV1
			title='Kuantitas'
			icon={<Database size={20} className='text-ink-primary' />}
			style={{ content: 'pt-4 space-y-4' }}
		>
			<div>
				<p className='text-ink-light'>Total</p>
				<p className='text-ink-secondary text-2xl font-medium'>
					{data?.data?.totalStock}
				</p>
			</div>
			<div>
				<p className='text-ink-light'>Tersedia</p>
				<p className='text-ink-secondary text-2xl font-medium'>
					{data?.data?.availableStock}
				</p>
			</div>
		</CardV1>
	)
}

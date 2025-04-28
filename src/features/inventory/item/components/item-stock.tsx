import { Card } from '@/shared/components/ui/card'

type props = {
	id?: string
}
export default function ItemStock({ id }: props) {
	return (
		<Card className='p-6 flex gap-2 flex-col'>
			<div>
				<p className='text-ink-light'>Total</p>
				<p className='text-ink-secondary text-2xl font-medium'>120</p>
			</div>
			<div>
				<p className='text-ink-light'>Tersedia</p>
				<p className='text-ink-secondary text-2xl font-medium'>20</p>
			</div>
		</Card>
	)
}

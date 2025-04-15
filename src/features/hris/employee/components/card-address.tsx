import { Card, CardContent, CardTitle } from '@/components/ui/card'

export default function CardAddress() {
	return (
		<Card className='p-6'>
			<CardTitle className='text-ink-secondary text-base'>
				Alamat dan kontak
			</CardTitle>
			<CardContent className='p-0 space-y-4 pt-4'>
				<div>
					<p className='text-ink-light'>Alamat</p>
					<p className='text-ink-primary'>
						Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facere quo
						ratione atque tempore mollitia veritatis nostrum eum beatae sed eos
					</p>
				</div>
				<div>
					<p className='text-ink-light'>Kontak</p>
					<p className='text-ink-primary'>0878798244272</p>
				</div>
			</CardContent>
		</Card>
	)
}

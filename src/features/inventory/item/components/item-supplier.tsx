import PhotoUrl from '@/shared/components/common/photo-url'
import { Card } from '@/shared/components/ui/card'
import { ScrollArea } from '@/shared/components/ui/scroll-area'

type props = {
	id?: string
}
export default function ItemSupplier({ id }: props) {
	return (
		<Card className='p-0 overflow-hidden'>
			<div className='flex items-center justify-between px-6 pt-6'>
				<p className='text-ink-primary'>Suplier</p>
			</div>
			<ScrollArea className='h-[280px] px-6 pt-2'>
				<div className='flex flex-col gap-4'>
					{[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i, index) => (
						<div key={index} className='flex justify-between items-center'>
							<div className='flex gap-2 items-center'>
								<PhotoUrl url='' style={{img: 'w-10 h-10'}} />
								<p className='text-ink-secondary'>Toko sinar</p>
							</div>
							<p className='text-ink-light'>12/10/2024</p>
						</div>
					))}
				</div>
			</ScrollArea>
		</Card>
	)
}

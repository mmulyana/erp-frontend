import { Bell } from 'lucide-react'

import { ScrollArea } from '@/shared/components/ui/scroll-area'
import PhotoUrl from '@/shared/components/common/photo-url'
import CardV1 from '@/shared/components/common/card-v1'

export default function ItemDueSoon() {
	return (
		<CardV1
			title='Barang hampir habis'
			icon={<Bell size={20} className='text-ink-primary' />}
			style={{ card: 'h-[290px] pr-0', content: 'pt-4' }}
		>
			<ScrollArea className='pr-6'>
				<div className='flex justify-between items-center'>
					<div className='flex gap-4 items-center'>
						<PhotoUrl url='' style={{ img: 'h-12 w-12 rounded-xl' }} />
						<p className='text-ink-primary'>Semen</p>
					</div>
					<p className='text-ink-primary'>
						<span className='opacity-50'>Sisa</span> 8 Pcs
					</p>
				</div>
			</ScrollArea>
		</CardV1>
	)
}

import { Link } from 'react-router-dom'
import { Bell } from 'lucide-react'

import { ScrollArea } from '@/shared/components/ui/scroll-area'
import { paths } from '@/shared/constants/paths'
import PhotoUrl from '@/shared/components/common/photo-url'
import CardV1 from '@/shared/components/common/card-v1'

import { useLowStock } from '../../item/api/use-low-stock'

export default function ItemDueSoon() {
	const { data } = useLowStock()

	const inventories = (data?.data && data.data) || []

	return (
		<CardV1
			title='Barang hampir habis'
			icon={<Bell size={20} className='text-ink-primary' />}
			style={{ card: 'h-[290px] pr-0', content: 'pt-4' }}
		>
			<ScrollArea className='pr-6'>
				<div className='flex flex-col gap-6'>
					{inventories?.map((i) => (
						<div key={i.id} className='flex justify-between items-center'>
							<div className='flex gap-4 items-center'>
								<PhotoUrl
									url={i.photoUrl || ''}
									style={{ img: 'h-12 w-12 rounded-xl' }}
								/>
								<Link
									to={`${paths.inventoryMasterdataItem}/${i.id}`}
									className='text-ink-primary'
								>
									{i.name}
								</Link>
							</div>
							<p className='text-ink-primary'>
								<span className='opacity-50'>Sisa</span> {i.totalStock}{' '}
								{i.unitOfMeasurement}
							</p>
						</div>
					))}
				</div>
			</ScrollArea>
		</CardV1>
	)
}

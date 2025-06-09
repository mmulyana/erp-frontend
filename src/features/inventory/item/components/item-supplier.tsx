import { ExternalLink, Store } from 'lucide-react'
import { Link } from 'react-router-dom'

import { ScrollArea } from '@/shared/components/ui/scroll-area'
import { paths } from '@/shared/constants/paths'
import PhotoUrl from '@/shared/components/common/photo-url'
import CardV1 from '@/shared/components/common/card-v1'

import { useSupplierItem } from '../api/use-supplier-item'

type props = {
	id?: string
}
export default function ItemSupplier({ id }: props) {
	const { data } = useSupplierItem({ id })
	return (
		<CardV1
			title='Supplier'
			icon={<Store size={20} className='text-ink-primary' />}
			style={{ content: 'overflow-hidden pt-4' }}
		>
			<ScrollArea className='h-[280px]'>
				<div className='flex flex-col gap-4'>
					{data?.data?.map((i) => (
						<div
							key={i.stockInId}
							className='flex justify-between items-center'
						>
							<div className='flex gap-2 items-center'>
								<PhotoUrl
									url={i.photoUrl || ''}
									style={{ img: 'w-14 h-14 rounded-md' }}
								/>
								<div>
									<p className='text-ink-secondary'>{i.name}</p>
								</div>
							</div>
							<Link
								to={`${paths.inventoryMasterdataSupplier}/${i.supplierId}`}
								className='flex gap-2 items-center'
							>
								<span className='px-0.5'>Lihat</span>
								<ExternalLink size={16} />
							</Link>
						</div>
					))}
				</div>
			</ScrollArea>
		</CardV1>
	)
}

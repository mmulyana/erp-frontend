import { Link } from 'react-router-dom'
import { Plus } from 'lucide-react'

import { buttonVariants } from '../ui/button'

type props = {
	title: string
	subtitle: string
	action?: React.ReactNode
	url?: string
	actionLabel?: string
}
export default function HeadPage({
	title,
	subtitle,
	action,
	url,
	actionLabel = 'Tambah',
}: props) {
	return (
		<div className='flex justify-between items-center'>
			<div>
				<p className='text-ink-primary font-medium leading-none mb-2'>
					{title}
				</p>
				<p className='text-ink-primary/50 leading-none'>{subtitle}</p>
			</div>
			{action ?? (
				<Link to={url || ''} className={buttonVariants()}>
					<Plus size={16} className='stroke-white' />
					<span className='px-0.5'>{actionLabel}</span>
				</Link>
			)}
		</div>
	)
}

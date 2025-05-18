import { Link } from 'react-router-dom'
import { Plus } from 'lucide-react'

import { buttonVariants } from '../ui/button'

type props = {
	title: string
	subtitle: string
	action?: React.ReactNode
	url?: string
	actionLabel?: string
	icon?: React.ReactNode
	hideAction?: boolean
}
export default function HeadPage({
	title,
	subtitle,
	action,
	url,
	actionLabel = 'Tambah',
	icon,
	hideAction = false,
}: props) {
	return (
		<div className='flex justify-between items-center'>
			<div>
				<div className='flex gap-2 items-center mb-2'>
					{icon}
					<p className='text-ink-primary font-medium leading-none'>{title}</p>
				</div>
				<p className='text-ink-primary/50 leading-none'>{subtitle}</p>
			</div>
			{!hideAction &&
				(action || (
					<Link to={url || ''} className={buttonVariants()}>
						<Plus size={16} className='stroke-white' />
						<span className='px-0.5'>{actionLabel}</span>
					</Link>
				))}
		</div>
	)
}

import { cn } from '@/shared/utils/cn'

type props = {
	percentage: number
	width?: string
	className?: string
}

export default function ProgressPercentage({
	percentage,
	width = '120px',
	className = '',
}: props) {
	return (
		<div className={cn('flex items-center gap-2', className)}>
			<div
				role='progressbar-container'
				className='relative bg-gray-200/50 rounded-full h-2'
				style={{ width }}
			>
				<div
					role='progressbar-inner'
					className='absolute left-0 top-0 h-2 bg-brand rounded-full'
					style={{ width: `${percentage}%` }}
				/>
			</div>
			<p className='text-ink-primary w-9 text-right'>{percentage}%</p>
		</div>
	)
}

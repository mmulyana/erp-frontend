import { cn } from '@/shared/utils/cn'
import React from 'react'

interface ProgressBarProps {
	percentage: number
	width?: string
	className?: string
}

export default function ProgressPercentage({
	percentage,
	width = '120px',
	className = '',
}: ProgressBarProps) {
	return (
		<div className={cn(`flex items-center gap-2`, className)}>
			<div
				className='relative bg-gray-200/50 rounded-full h-2'
				style={{ width }}
			>
				<div
					className='absolute left-0 top-0 h-2 bg-brand rounded-full'
					style={{ width: `${percentage}%` }}
				></div>
			</div>
			<p className='text-ink-secondary'>{percentage}%</p>
		</div>
	)
}

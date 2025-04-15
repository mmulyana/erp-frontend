import { useState } from 'react'

import { cn } from '@/shared/utils/cn'

type Props = {
	month?: string
	selectedDates?: number[]
	onDateSelect?: (date: number) => void
	locale?: string
	className?: string
}

export function CalendarV1({
	month = 'Juli',
	selectedDates = [],
	locale = 'id-ID',
	className,
}: Props) {
	const [dates] = useState<number[]>(selectedDates)

	const daysOfWeek = {
		'id-ID': ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'],
		'en-US': ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
	}

	const days = Array.from({ length: 31 }, (_, i) => i + 1)
	const startDay = 5

	const calendarGrid = []
	for (let i = 0; i < startDay; i++) {
		calendarGrid.push(null)
	}

	calendarGrid.push(...days)

	return (
		<div className={cn('w-full max-w-xs', className)}>
			<h2 className='mb-2 text-lg font-medium'>{month}</h2>

			<div className='grid grid-cols-7 gap-1 text-xs text-gray-500'>
				{daysOfWeek[locale as keyof typeof daysOfWeek]?.map((day, index) => (
					<div key={index} className='text-center font-medium'>
						{day}
					</div>
				))}
			</div>

			<div className='mt-2 grid grid-cols-7 gap-1'>
				{calendarGrid.map((day, index) => (
					<div key={index} className='aspect-square'>
						{day ? (
							<button
								onClick={() => console.log(day)}
								className={cn(
									'flex h-full w-full items-center justify-center rounded-md text-sm transition-colors',
									dates.includes(day)
										? 'bg-success text-white hover:bg-teal-600'
										: 'hover:bg-gray-100'
								)}
							>
								{day}
							</button>
						) : (
							<div className='h-full w-full' />
						)}
					</div>
				))}
			</div>
		</div>
	)
}

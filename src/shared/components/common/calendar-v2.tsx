import { useMemo } from 'react'

import { MONTHS_OBJ } from '@/shared/constants/months'
import { cn } from '@/shared/utils/cn'

type Props = {
	monthIndex: number
	presenceDates?: number[]
	absentDates?: number[]
	className?: string
	year?: number
}

export function CalendarV2({
	monthIndex,
	presenceDates = [],
	absentDates = [],
	className,
	year = new Date().getFullYear(),
}: Props) {
	const daysOfWeek = {
		'id-ID': ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'],
		'en-US': ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
	}

	const daysInMonth = useMemo(() => {
		return new Date(year, monthIndex + 1, 0).getDate()
	}, [monthIndex, year])

	const startDay = useMemo(() => {
		const day = new Date(year, monthIndex, 1).getDay()
		return day === 0 ? 6 : day - 1
	}, [monthIndex, year])

	const calendarGrid = useMemo(() => {
		const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)
		return [...Array(startDay).fill(null), ...days]
	}, [daysInMonth, startDay])

	const monthName = MONTHS_OBJ[monthIndex]

	return (
		<div className={cn('w-full max-w-xs', className)}>
			<div className='flex justify-between items-center'>
				<h2 className='mb-2 text-ink-secondary font-medium select-none'>
					{monthName}
				</h2>
			</div>

			<div className='grid grid-cols-7 gap-1 text-xs text-gray-500'>
				{daysOfWeek['id-ID' as keyof typeof daysOfWeek]?.map((day, index) => (
					<div key={index} className='text-center text-ink-secondary'>
						{day}
					</div>
				))}
			</div>

			<div className='mt-2 grid grid-cols-7 gap-1'>
				{calendarGrid.map((day, index) => (
					<div key={index} className='aspect-square'>
						{day ? (
							<button
								className={cn(
									'flex h-full w-full items-center justify-center rounded-md text-sm transition-colors cursor-default',
									presenceDates.includes(day)
										? 'bg-success text-white hover:bg-teal-600'
										: absentDates.includes(day)
										? 'bg-error text-white hover:bg-red-600'
										: 'text-ink-light hover:bg-gray-100'
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

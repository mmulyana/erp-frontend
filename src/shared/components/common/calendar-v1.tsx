import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useMemo } from 'react'

import { cn } from '@/shared/utils/cn'

import { Button } from '../ui/button'

type Props = {
	month?: string
	monthIndex: number // nb: 0 = Januari sd 11 = Desember
	year?: number
	selectedDates?: number[]
	onDateSelect?: (date: number) => void
	locale?: string
	className?: string
	style?: {
		title?: string
		titleWrapper?: string
	}
	showNavigation?: boolean
	onNext?: () => void
	onPrev?: () => void
}

export function CalendarV1({
	month,
	monthIndex,
	year = new Date().getFullYear(),
	selectedDates = [],
	locale = 'id-ID',
	className,
	onDateSelect,
	style,
	showNavigation = false,
	onNext,
	onPrev,
}: Props) {
	const daysOfWeek = {
		'id-ID': ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'],
		'en-US': ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
	}

	// jumlah hari dalam sebulan
	const daysInMonth = useMemo(() => {
		return new Date(year, monthIndex + 1, 0).getDate()
	}, [monthIndex, year])

	// hari pertama
	const startDay = useMemo(() => {
		const day = new Date(year, monthIndex, 1).getDay()
		return day === 0 ? 6 : day - 1
	}, [monthIndex, year])

	// Buat data array untuk tanggal2
	const calendarGrid = useMemo(() => {
		const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)
		return [...Array(startDay).fill(null), ...days]
	}, [daysInMonth, startDay])

	const monthName =
		month ??
		new Date(year, monthIndex).toLocaleString(locale, { month: 'long' })

	return (
		<div className={cn('w-full max-w-xs', className)}>
			<div
				className={cn('flex justify-between items-center', style?.titleWrapper)}
			>
				<h2
					className={cn(
						'mb-2 text-ink-secondary font-medium select-none',
						style?.title
					)}
				>
					{monthName} {year}
				</h2>
				{showNavigation && (
					<div>
						<Button
							variant='outline'
							className='rounded-l-md rounded-r-none border-r-0 py-0.5 px-1 h-fit'
							onClick={onPrev}
						>
							<ChevronLeft size={20} />
						</Button>
						<Button
							variant='outline'
							className='rounded-r-md rounded-l-none py-0.5 px-1 h-fit'
							onClick={onNext}
						>
							<ChevronRight size={20} />
						</Button>
					</div>
				)}
			</div>

			<div className='grid grid-cols-7 gap-1 text-xs text-gray-500'>
				{daysOfWeek[locale as keyof typeof daysOfWeek]?.map((day, index) => (
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
								onClick={() => onDateSelect?.(day)}
								className={cn(
									'flex h-full w-full items-center justify-center rounded-md text-sm transition-colors text-ink-light',
									selectedDates.includes(day)
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

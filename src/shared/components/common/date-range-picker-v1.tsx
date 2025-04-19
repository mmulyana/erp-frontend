import { addDays, differenceInDays, format, isAfter, isBefore } from 'date-fns'
import { CalendarIcon, X } from 'lucide-react'
import { id } from 'date-fns/locale'
import { useState } from 'react'
import { toast } from 'sonner'

import { cn } from '@/shared/utils/cn'

import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Calendar } from '../ui/calendar'
import { Button } from '../ui/button'

type Props = {
	startDate?: Date
	endDate?: Date
	maxRange?: number
	onChange?: (date: { from: Date | undefined; to: Date | undefined }) => void
}

export function DateRangePickerV1({
	startDate,
	endDate,
	maxRange = 13,
	onChange,
}: Props) {
	const [date, setDate] = useState<{
		from: Date | undefined
		to: Date | undefined
	}>({
		from: startDate || undefined,
		to: endDate || undefined,
	})

	const [isOpen, setIsOpen] = useState(false)
	const [error, setError] = useState<string | null>(null)

	const MAX_RANGE_DAYS = maxRange

	// Reset saat dibuka
	const handleOpenChange = (open: boolean) => {
		setIsOpen(open)
		if (open) {
			const reset = { from: undefined, to: undefined }
			setDate(reset)
			setError(null)
			onChange?.(reset)
		}
	}

	const handleRangeSelect = (range: { from?: Date; to?: Date } | undefined) => {
		if (!range || !range.from) return

		const from = range.from
		const to = range.to ?? undefined
		setError(null)

		if (to) {
			const daysDiff = differenceInDays(to, from)
			if (Math.abs(daysDiff) > MAX_RANGE_DAYS) {
				const limitedTo = addDays(
					from,
					daysDiff > 0 ? MAX_RANGE_DAYS : -MAX_RANGE_DAYS
				)
				const newRange = { from, to: limitedTo }
				setDate(newRange)
				onChange?.(newRange)
				toast.error(`Tidak boleh melebihi ${MAX_RANGE_DAYS} hari`)
			} else {
				const newRange = { from, to }
				setDate(newRange)
				onChange?.(newRange)
				setIsOpen(false)
			}
		} else {
			const newRange = { from, to: undefined }
			setDate(newRange)
			onChange?.(newRange)
		}
	}

	const handleClear = () => {
		const cleared = { from: undefined, to: undefined }
		setDate(cleared)
		setError(null)
		onChange?.(cleared)
	}

	const formatDateRange = () => {
		if (date.from && date.to) {
			return `${format(date.from, 'PPP', { locale: id })} - ${format(
				date.to,
				'PPP',
				{ locale: id }
			)}`
		}
		if (date.from) {
			return format(date.from, 'PPP', { locale: id })
		}
		return 'Pilih tanggal'
	}

	return (
		<div className='grid gap-2'>
			<Popover open={isOpen} onOpenChange={handleOpenChange}>
				<PopoverTrigger asChild>
					<Button
						id='date'
						variant='outline'
						className={cn(
							'w-full justify-start text-left font-normal',
							!date.from && 'text-muted-foreground'
						)}
					>
						<CalendarIcon className='mr-2 h-4 w-4' />
						{formatDateRange()}
						{(date.from || date.to) && (
							<X
								className='ml-auto h-4 w-4 opacity-50 hover:opacity-100'
								onClick={(e) => {
									e.stopPropagation()
									handleClear()
								}}
							/>
						)}
					</Button>
				</PopoverTrigger>
				<PopoverContent className='w-auto p-0' align='start'>
					<Calendar
						initialFocus
						mode='range'
						weekStartsOn={1}
						locale={id}
						selected={date}
						defaultMonth={date.from}
						onSelect={handleRangeSelect}
						numberOfMonths={2}
						disabled={(day) => {
							if (date.from) {
								const tooEarly = isBefore(
									day,
									addDays(date.from, -MAX_RANGE_DAYS)
								)
								const tooLate = isAfter(day, addDays(date.from, MAX_RANGE_DAYS))
								return tooEarly || tooLate
							}
							return false
						}}
					/>
					{error && <div className='p-3 text-sm text-red-500'>{error}</div>}
					<div className='p-3 border-t border-border'>
						<div className='text-sm text-muted-foreground'>
							Maksimal {MAX_RANGE_DAYS+1} hari sebelum atau sesudahnya
						</div>
					</div>
				</PopoverContent>
			</Popover>
		</div>
	)
}

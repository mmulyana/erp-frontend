import { useQueryStates, parseAsIsoDate } from 'nuqs'
import { Calendar } from '../ui/calendar'
import { Popover, PopoverTrigger, PopoverContent } from '../ui/popover'
import { Button } from '../ui/button'
import { CalendarIcon, ChevronsUpDown } from 'lucide-react'
import { format } from 'date-fns'
import { cn } from '@/shared/utils/cn'
import { id } from 'date-fns/locale'

export default function DateRangePicker() {
	const [{ startDate, endDate }, setDates] = useQueryStates({
		startDate: parseAsIsoDate.withDefault(new Date()),
		endDate: parseAsIsoDate.withDefault(new Date()),
	})

	return (
		<div className='flex gap-2'>
			<div>
				<p className='text-sm text-ink-primary/50'>Dari</p>
				<Popover>
					<PopoverTrigger asChild>
						<Button
							variant='outline'
							className={cn(
								'w-fit h-8 text-left font-normal',
								!startDate && 'text-ink-primary'
							)}
						>
							<CalendarIcon size={16} className='mr-1 text-ink-light' />
							{startDate ? format(startDate, 'dd/MM/yyyy') : 'Pilih Tanggal'}
							<ChevronsUpDown size={16} className='ml-2 text-ink-light' />
						</Button>
					</PopoverTrigger>
					<PopoverContent className='w-auto p-0' align='start'>
						<Calendar
							mode='single'
							selected={startDate}
							onSelect={(date) => setDates({ startDate: date ?? undefined })}
							disabled={(date) => date > new Date()}
							weekStartsOn={1}
							locale={id}
						/>
					</PopoverContent>
				</Popover>
			</div>

			<div>
				<p className='text-sm text-ink-primary/50'>Sampai</p>
				<Popover>
					<PopoverTrigger asChild>
						<Button
							variant='outline'
							className={cn(
								'w-fit h-8 text-left font-normal',
								!endDate && 'text-muted-foreground'
							)}
						>
							<CalendarIcon size={16} className='mr-1 text-ink-light' />
							{endDate ? format(endDate, 'dd/MM/yyyy') : 'Pilih Tanggal'}
							<ChevronsUpDown size={16} className='ml-2 text-ink-light' />
						</Button>
					</PopoverTrigger>
					<PopoverContent className='w-auto p-0' align='start'>
						<Calendar
							mode='single'
							selected={endDate}
							onSelect={(date) => {
								if (date && startDate && date < startDate) return
								setDates({ endDate: date ?? undefined })
							}}
							disabled={(date) => date > new Date()}
							weekStartsOn={1}
							locale={id}
						/>
					</PopoverContent>
				</Popover>
			</div>
		</div>
	)
}

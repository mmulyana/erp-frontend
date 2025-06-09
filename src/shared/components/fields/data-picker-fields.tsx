import { CalendarIcon } from 'lucide-react'
import { id } from 'date-fns/locale'
import { format } from 'date-fns'
import { ReactNode } from 'react'

import { cn } from '@/shared/utils/cn'

import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Calendar } from '../ui/calendar'
import { Button } from '../ui/button'

type props = {
	value?: Date
	onChange?: (date: Date | undefined | null) => void
	placeholder?: string
	disabledDate?: (date: Date) => boolean
	customTrigger?: ReactNode
	showReset?: boolean
}

export function DatePickerField({
	value,
	onChange,
	placeholder = 'Pilih tanggal',
	disabledDate = (date) => date > new Date() || date < new Date('1900-01-01'),
	customTrigger,
	showReset = false,
}: props) {
	return (
		<Popover>
			<PopoverTrigger asChild>
				{customTrigger ?? (
					<Button
						variant='outline'
						className={cn(
							'h-10 bg-surface px-3 text-left font-normal',
							!value && 'text-muted-foreground'
						)}
					>
						{value ? (
							format(value, 'PPP', { locale: id })
						) : (
							<span>{placeholder}</span>
						)}
						<CalendarIcon className='ml-auto' size={18} strokeWidth={2.5} />
					</Button>
				)}
			</PopoverTrigger>
			<PopoverContent className='w-auto p-0' align='start'>
				<Calendar
					weekStartsOn={1}
					locale={id}
					mode='single'
					selected={value}
					onSelect={onChange}
					disabled={disabledDate}
					initialFocus
				/>
				<div className='px-4 pb-2'>
					{showReset && value && (
						<Button
							variant='ghost'
							className='hover:bg-transparent p-0 text-error'
							onClick={() => onChange?.(null)}
						>
							Hapus
						</Button>
					)}
				</div>
			</PopoverContent>
		</Popover>
	)
}

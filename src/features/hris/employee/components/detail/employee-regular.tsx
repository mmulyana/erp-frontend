import { useParams } from 'react-router-dom'
import { useState } from 'react'
import {
	Calendar as CalendarIcon,
	Check,
	ChevronsUpDown,
	FilePen,
} from 'lucide-react'

import { CalendarV2 } from '@/shared/components/common/calendar-v2'
import { Button } from '@/shared/components/ui/button'
import { cn } from '@/shared/utils/cn'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/shared/components/ui/popover'

import { useDataRegular } from '../../api/use-data-regular'

const OPTIONS = [
	{
		label: 'Januari - Juni',
		value: {
			from: 0,
			to: 5,
		},
	},
	{
		label: 'Juli - Agustus',
		value: {
			from: 6,
			to: 11,
		},
	},
]

const currentYear = new Date().getFullYear()
const YEARS = Array.from({ length: currentYear - 2020 + 1 }, (_, i) => 2020 + i)

export default function EmployeeRegular() {
	const { id } = useParams()

	const [selectedYear, setSelectedYear] = useState(currentYear)
	const [selected, setSelected] = useState(OPTIONS[0])

	const { data } = useDataRegular({
		id,
		endMonth: String(selected.value.to),
		startMonth: String(selected.value.from),
		year: String(selectedYear),
	})

	return (
		<>
			<div className='flex items-center justify-between p-6 flex-col md:flex-row gap-5 w-full'>
				<div className='flex gap-2 items-center'>
					<FilePen className='text-ink-light' />
					<p className='text-ink-primary font-medium'>Absensi</p>
				</div>
				<div className='flex gap-4 items-center'>
					<Popover>
						<PopoverTrigger asChild>
							<Button
								variant='outline'
								className='h-6 px-0.5 pl-1.5 rounded-md'
							>
								<CalendarIcon size={16} className='text-ink-light mr-1.5' />
								{selected.label}
								<ChevronsUpDown
									size={16}
									className='text-ink-primary/50 ml-1'
								/>
							</Button>
						</PopoverTrigger>
						<PopoverContent className='w-[--radix-popover-trigger-width] p-2'>
							{OPTIONS.map((opt) => (
								<button
									key={opt.label}
									onClick={() => setSelected(opt)}
									className={cn(
										'flex items-center px-2 py-1.5 text-sm hover:bg-muted rounded-md w-full',
										opt.label === selected.label && 'bg-muted'
									)}
								>
									{opt.label}
									{opt.label === selected.label && (
										<Check className='ml-auto h-4 w-4 text-primary' />
									)}
								</button>
							))}
						</PopoverContent>
					</Popover>
					<Popover>
						<PopoverTrigger asChild>
							<Button
								variant='outline'
								className='w-fit justify-between !pl-2 h-6 px-0.5 rounded-md'
							>
								{selectedYear}
								<ChevronsUpDown
									size={16}
									className='text-ink-primary/50 ml-1'
								/>
							</Button>
						</PopoverTrigger>
						<PopoverContent className='w-[--radix-popover-trigger-width] p-2'>
							{YEARS.map((year) => (
								<button
									key={year}
									onClick={() => setSelectedYear(year)}
									className={cn(
										'flex items-center w-full px-2 py-1.5 text-sm hover:bg-muted rounded-md',
										year === selectedYear && 'bg-muted'
									)}
								>
									{year}
									{year === selectedYear && (
										<Check className='ml-auto h-4 w-4 text-primary' />
									)}
								</button>
							))}
						</PopoverContent>
					</Popover>
				</div>
			</div>
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-6 pb-6 gap-6'>
				{data?.data?.data?.map((i, index) => (
					<CalendarV2
						key={index}
						monthIndex={i.month}
						presenceDates={i.presence}
						absentDates={i.absent}
					/>
				))}
			</div>
		</>
	)
}

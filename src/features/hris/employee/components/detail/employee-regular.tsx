import { ChevronLeft, ChevronRight, Contact2Icon } from 'lucide-react'
import { useState } from 'react'

import { CalendarV1 } from '@/shared/component/calendar-v1'
import { MONTHS_OBJ } from '@/shared/constants/months'

import { Button } from '@/components/ui/button'

import { useCurrentCalendar } from '../../hooks/use-current-calendar'

export default function EmployeeRegular() {
	const [data] = useState([
		{
			selectedDates: [1, 2, 3, 5, 9, 10, 12, 20, 24],
		},
		{
			selectedDates: [2, 4, 5, 6, 9, 10, 11, 12, 14, 15, 20],
		},
		{
			selectedDates: [3, 4, 5, 10, 12, 14, 15, 16, 17, 18, 19, 20],
		},
	])

	const { group, canNext, canPrev, next, prev } = useCurrentCalendar()

	return (
		<>
			<div className='flex gap-2 items-center p-6'>
				<Contact2Icon className='text-ink-secondary' />
				<p className='text-ink-secondary font-medium'>Absensi</p>
			</div>
			<div className='flex items-center justify-between px-6 pb-6 flex-col md:flex-row gap-5 w-full'>
				<div className='gap-6 flex items-center justify-start w-full'>
					<div className='border-l border-border flex flex-col pl-2 justify-center'>
						<p className='text-ink-light text-sm'>Total hadir</p>
						<p className='text-ink-primary font-medium'>120</p>
					</div>
					<div className='border-l border-border flex flex-col pl-2 justify-center'>
						<p className='text-ink-light text-sm'>Total tidak hadir</p>
						<p className='text-ink-primary font-medium'>90</p>
					</div>
				</div>
				<div className='gap-6 flex justify-end w-full items-end md:items-center flex-col md:flex-row'>
					<div className='flex gap-2 items-center'>
						<p className='text-ink-secondary'>{MONTHS_OBJ[group[0]]}</p>
						<span className='text-ink-light'>-</span>
						<p className='text-ink-secondary'>{MONTHS_OBJ[group[2]]}</p>
					</div>
					<div>
						<Button
							variant='outline'
							className='rounded-l-md rounded-r-none border-r-0 py-0.5 px-1 h-fit'
							disabled={!canPrev}
							onClick={prev}
						>
							<ChevronLeft size={20} />
						</Button>
						<Button
							variant='outline'
							className='rounded-r-md rounded-l-none py-0.5 px-1 h-fit'
							disabled={!canNext}
							onClick={next}
						>
							<ChevronRight size={20} />
						</Button>
					</div>
				</div>
			</div>
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-6 pb-6 gap-6'>
				{data.map((i, index) => (
					<CalendarV1
						key={index}
						selectedDates={i.selectedDates}
						month={MONTHS_OBJ[group[index]]}
					/>
				))}
			</div>
		</>
	)
}

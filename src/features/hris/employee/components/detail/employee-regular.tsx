import { ChevronLeft, ChevronRight, Contact2Icon } from 'lucide-react'
import { useParams } from 'react-router-dom'

import { CalendarV1 } from '@/shared/components/common/calendar-v1'
import CardData from '@/shared/components/common/card-data'
import { MONTHS_OBJ } from '@/shared/constants/months'
import { Button } from '@/shared/components/ui/button'

import { useCurrentMonth } from '../../hooks/use-current-month'
import { useDataRegular } from '../../api/use-data-regular'
import { useDateRange } from '../../hooks/use-date-range'

export default function EmployeeRegular() {
	const { id } = useParams()

	const { group, canNext, canPrev, next, prev, groupIndex } = useCurrentMonth()
	const { startDate, endDate } = useDateRange(groupIndex)

	const { data } = useDataRegular({
		id,
		startDate: startDate.toString(),
		endDate: endDate.toString(),
	})

	return (
		<>
			<div className='flex gap-2 items-center p-6'>
				<Contact2Icon className='text-ink-secondary' />
				<p className='text-ink-secondary font-medium'>Absensi</p>
			</div>
			<div className='flex items-center justify-between px-6 pb-6 flex-col md:flex-row gap-5 w-full'>
				<div className='gap-6 flex items-center justify-start w-full'>
					<CardData title='Hadir' value={data?.data?.total.presence || 0} />
					<CardData title='Tdk hadir' value={data?.data?.total.absent || 0} />
					<CardData title='Blm diabsen' value={data?.data?.total.notYet || 0} />
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
				{data?.data?.data?.map((i, index) => (
					<CalendarV1
						key={index}
						monthIndex={group[index]}
						selectedDates={i.presence}
						month={MONTHS_OBJ[group[index]]}
					/>
				))}
			</div>
		</>
	)
}

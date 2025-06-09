import { useQueryState, parseAsTimestamp } from 'nuqs'

import { Calendar } from '@/shared/components/ui/calendar'
import { id } from 'date-fns/locale'

export default function CalendarAttendance() {
	const [selectedDate, setSelectedDate] = useQueryState(
		'date',
		parseAsTimestamp.withDefault(new Date())
	)

	return (
		<div className='max-w-fit bg-white h-fit rounded-xl border border-line'>
			<Calendar
				mode='single'
				selected={new Date(selectedDate)}
				onSelect={(d) => {
					if (d) {
						// console.log('date', d)
						setSelectedDate(d)
					}
				}}
				locale={id}
				weekStartsOn={1}
				classNames={{
					day_selected: 'bg-brand text-white',
				}}
			/>
		</div>
	)
}

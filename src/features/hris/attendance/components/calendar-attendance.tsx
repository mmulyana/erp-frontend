import { parseAsInteger, useQueryState } from 'nuqs'

import { useCurrentDate } from '@/shared/hooks/use-current-date'
import { CalendarV1 } from '@/shared/components/common/calendar-v1'
import { MONTHS_OBJ } from '@/shared/constants/months'

export default function CalendarAttendance() {
	const { month, date } = useCurrentDate()

	const [selectedDate, setSelectedDate] = useQueryState(
		'date',
		parseAsInteger.withDefault(0)
	)
	const [selectedMonth, setSelectedMonth] = useQueryState(
		'month',
		parseAsInteger.withDefault(month)
	)

	return (
		<div className='w-[360px] max-w-full'>
			<CalendarV1
				monthIndex={selectedMonth}
				month={MONTHS_OBJ[selectedMonth]}
				selectedDates={[selectedDate || date]}
				onDateSelect={(e) => {
					setSelectedDate(e)
				}}
				style={{
					title: 'text-xl',
					titleWrapper: 'pb-4',
				}}
				showNavigation
				onNext={() => {
					setSelectedMonth((prev) => prev + 1)
					if (selectedMonth + 1 === month) {
						setSelectedDate(date)
					}
				}}
				onPrev={() => {
					setSelectedMonth((prev) => prev - 1)
				}}
			/>
		</div>
	)
}

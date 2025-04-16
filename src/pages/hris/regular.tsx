import { useState } from 'react'

import { CalendarV1 } from '@/shared/components/calendar-v1'
import { HrisLayout } from '@/shared/layout/hris-layout'
import { useCurrentDate } from '@/shared/hooks/use-current-date'
import { MONTHS_OBJ } from '@/shared/constants/months'
import { Card } from '@/shared/components/ui/card'

export default function Regular() {
	const { month, date } = useCurrentDate()
	console.log('data', date)
	const [selectedDate, setSelectedDate] = useState<number>(date)
	const [selectedMonth, setSelectedMonth] = useState(month)

	return (
		<HrisLayout>
			<div className='flex gap-6 flex-col md:flex-row'>
				<CalendarV1
					monthIndex={selectedMonth}
					month={MONTHS_OBJ[selectedMonth]}
					selectedDates={[selectedDate]}
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
				<Card className='w-full p-6'></Card>
			</div>
		</HrisLayout>
	)
}

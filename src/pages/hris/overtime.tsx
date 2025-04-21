import { DefaultLayout } from '@/shared/layout/default-layout'

import SectionOvertime from '@/features/hris/attendance/components/overtime/section-overtime'
import CalendarAttendance from '@/features/hris/attendance/components/calendar-attendance'

export default function Overtime() {
	return (
		<DefaultLayout module='hris'>
			<div className='flex gap-4 flex-col md:flex-row'>
				<CalendarAttendance />
				<SectionOvertime />
			</div>
		</DefaultLayout>
	)
}

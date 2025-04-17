import { HrisLayout } from '@/shared/layout/hris-layout'

import CalendarAttendance from '@/features/hris/attendance/components/calendar-attendance'
import SectionOvertime from '@/features/hris/attendance/components/section-overtime'

export default function Overtime() {
	return (
		<HrisLayout>
			<div className='flex gap-4 flex-col md:flex-row'>
				<CalendarAttendance />
				<SectionOvertime />
			</div>
		</HrisLayout>
	)
}

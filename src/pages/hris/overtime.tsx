import { HrisLayout } from '@/shared/layout/hris-layout'

import CalendarAttendance from '@/features/hris/attendance/components/calendar-attendance'
import AttendanceOvertime from '@/features/hris/attendance/components/attendance-overtime'

export default function Overtime() {
	return (
		<HrisLayout>
			<div className='flex gap-10 flex-col md:flex-row'>
				<CalendarAttendance />
				<AttendanceOvertime />
			</div>
		</HrisLayout>
	)
}

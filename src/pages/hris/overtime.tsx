import { HrisLayout } from '@/shared/layout/hris-layout'

import SectionOvertime from '@/features/hris/attendance/components/overtime/section-overtime'
import CalendarAttendance from '@/features/hris/attendance/components/calendar-attendance'

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

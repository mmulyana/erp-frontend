import { HrisLayout } from '@/shared/layout/hris-layout'

import CalendarAttendance from '@/features/hris/attendance/components/calendar-attendance'
import SectionRegular from '@/features/hris/attendance/components/regular/section-regular'

export default function Regular() {
	return (
		<HrisLayout>
			<div className='flex gap-4 flex-col md:flex-row'>
				<CalendarAttendance />
				<SectionRegular />
			</div>
		</HrisLayout>
	)
}

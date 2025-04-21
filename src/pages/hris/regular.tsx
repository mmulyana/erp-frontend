import { DefaultLayout } from '@/shared/layout/default-layout'

import CalendarAttendance from '@/features/hris/attendance/components/calendar-attendance'
import SectionRegular from '@/features/hris/attendance/components/regular/section-regular'

export default function Regular() {
	return (
		<DefaultLayout module='hris'>
			<div className='flex gap-4 flex-col md:flex-row'>
				<CalendarAttendance />
				<SectionRegular />
			</div>
		</DefaultLayout>
	)
}

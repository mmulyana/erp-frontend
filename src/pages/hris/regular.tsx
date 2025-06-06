import { DefaultLayout } from '@/shared/layout/default-layout'

import CalendarAttendance from '@/features/hris/attendance/components/calendar-attendance'
import SectionRegular from '@/features/hris/attendance/components/regular/section-regular'
import PresenceTotal from '@/features/hris/attendance/components/regular/presence-total'
import AbsentTotal from '@/features/hris/attendance/components/regular/absent-total'

export default function Regular() {
	return (
		<DefaultLayout module='hris'>
			<div className='flex gap-4 flex-col-reverse md:flex-row'>
				<SectionRegular />
				<div className='space-y-6'>
					<CalendarAttendance />
					<PresenceTotal />
					<AbsentTotal />
				</div>
			</div>
		</DefaultLayout>
	)
}

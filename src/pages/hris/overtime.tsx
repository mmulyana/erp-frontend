import { DefaultLayout } from '@/shared/layout/default-layout'

import SectionOvertime from '@/features/hris/attendance/components/overtime/section-overtime'
import CalendarAttendance from '@/features/hris/attendance/components/calendar-attendance'
import OvertimeTotal from '@/features/hris/attendance/components/overtime/overtime-total'

export default function Overtime() {
	return (
		<DefaultLayout module='hris'>
			<div className='flex gap-4 flex-col-reverse md:flex-row'>
				<SectionOvertime />
				<div className='space-y-6 mb-4'>
					<CalendarAttendance />
					<OvertimeTotal />
				</div>
			</div>
		</DefaultLayout>
	)
}

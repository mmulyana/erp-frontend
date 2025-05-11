import { parseAsIsoDate, useQueryStates } from 'nuqs'

import DateRangePicker from '@/shared/components/common/date-range-picker'
import { DefaultLayout } from '@/shared/layout/default-layout'

import BarOvertime from '@/features/hris/attendance/components/overtime/bar-overtime'
import TotalAttendance from '@/features/hris/attendance/components/total-attendance'
import BarRegular from '@/features/hris/attendance/components/regular/bar-regular'
import ReminderCertif from '@/features/hris/dashboard/components/reminder-certif'
import ReminderSafety from '@/features/hris/dashboard/components/reminder-safety'
import TotalEmployee from '@/features/hris/employee/components/total-employee'
import { useWeek } from '@/features/hris/dashboard/hooks/use-week'

export default function DashboardHris() {
	const { startOfWeek, endOfWeek } = useWeek()

	const [{ startDate, endDate }] = useQueryStates({
		startDate: parseAsIsoDate.withDefault(startOfWeek),
		endDate: parseAsIsoDate.withDefault(endOfWeek),
	})

	return (
		<DefaultLayout module='hris'>
			<div className='grid grid-cols-1 xl:grid-cols-3 gap-6'>
				<div className='col-span-1 xl:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4 h-fit'>
					<TotalEmployee />
					<TotalAttendance />
					<div className='col-span-2 flex justify-end pb-2'>
						<DateRangePicker startDate={startDate} endDate={endDate} />
					</div>
					<BarRegular startDate={startDate} endDate={endDate} />
					<BarOvertime startDate={startDate} endDate={endDate} />
				</div>
				<div className='space-y-4'>
					<ReminderSafety />
					<ReminderCertif />
				</div>
			</div>
		</DefaultLayout>
	)
}

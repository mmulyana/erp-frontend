import BarOvertime from '@/features/hris/attendance/components/overtime/bar-overtime'
import BarRegular from '@/features/hris/attendance/components/regular/bar-regular'
import { TotalAttendance } from '@/features/hris/attendance/components/total-attendance'
import ReminderSafety from '@/features/hris/dashboard/components/reminder-safety'
import { TotalEmployee } from '@/features/hris/employee/components/total-employee'
import { DefaultLayout } from '@/shared/layout/default-layout'

export default function DashboardHris() {
	return (
		<DefaultLayout module='hris'>
			<div className='grid grid-cols-1 xl:grid-cols-3 gap-6'>
				<div className='col-span-1 xl:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4 h-fit'>
					<TotalEmployee />
					<TotalAttendance />
					<BarRegular />
					<BarOvertime />
				</div>
				<div className='space-y-4'>
					<ReminderSafety />
					<ReminderSafety />
				</div>
			</div>
		</DefaultLayout>
	)
}

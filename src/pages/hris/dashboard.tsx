import { HrisLayout } from '@/shared/layout/hris-layout'
import CardHighlight from '@/shared/components/common/card-highlight'

import TrenEmployee from '@/features/hris/dashboard/components/tren-employee'
import PieEducation from '@/features/hris/dashboard/components/pie-education'
import PiePosition from '@/features/hris/dashboard/components/pie-position'
import Reminder from '@/features/hris/dashboard/components/reminder'
import PieAge from '@/features/hris/dashboard/components/pie-age'
import TotalEmployee from '@/features/hris/dashboard/components/total-employee'

export default function DashboardHris() {
	return (
		<HrisLayout>
			<TotalEmployee />
			<div className='grid gap-6 grid-cols-1 lg:grid-cols-3 mt-6'>
				<div className='grid gap-6 col-span-1 md:col-span-2 grid-cols-1 md:grid-cols-2 h-fit'>
					<Reminder />
					<TrenEmployee />
				</div>
				<div className='space-y-6'>
					<PiePosition />
					{/* <PieAge /> */}
					<PieEducation />
				</div>
			</div>
		</HrisLayout>
	)
}

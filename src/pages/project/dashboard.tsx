import ProjectStatus from '@/features/projects/project/components/project-status'
import TotalRevenue from '@/features/projects/dashboard/components/total-revenue'
import BarReport from '@/features/projects/project/components/bar-report'
import TopClient from '@/features/projects/client/components/top-client'

import { DefaultLayout } from '@/shared/layout/default-layout'
import TotalEstimateRevenue from '@/features/projects/dashboard/components/total-estimate-revenue'
import ProjectAttachment from '@/features/projects/project/components/project-attachment'
import ProjectReport from '@/features/projects/project/components/project-report'

export default function DashboardProject() {
	return (
		<DefaultLayout module='project'>
			<div className='grid grid-cols-1 xl:grid-cols-[1fr_316px] gap-6'>
				<div className='space-y-6'>
					<div className='grid grid-cols-1 xl:grid-cols-[1fr_290px] gap-0 xl:gap-6'>
						<ProjectStatus />
						<div className='flex justify-between flex-col gap-6 mt-6 xl:mt-0'>
							<TotalRevenue />
							<TotalEstimateRevenue />
						</div>
					</div>
					<BarReport />
					<ProjectReport variant='dashboard' limit={10} />
				</div>
				<div className='space-y-6'>
					<TopClient />
					<ProjectAttachment />
				</div>
			</div>
		</DefaultLayout>
	)
}

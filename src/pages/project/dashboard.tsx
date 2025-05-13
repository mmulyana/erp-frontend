import Attachment from '@/features/projects/project/components/attachment'
import TopClient from '@/features/projects/client/components/top-client'
import ProjectStatus from '@/features/projects/project/components/project-status'
import CardV1 from '@/shared/components/common/card-v1'
import { DefaultLayout } from '@/shared/layout/default-layout'
import { Wallet } from 'lucide-react'
import BarReport from '@/features/projects/project/components/bar-report'

export default function DashboardProject() {
	return (
		<DefaultLayout module='project'>
			<div className='grid grid-cols-1 xl:grid-cols-[1fr_316px] gap-6'>
				<div className='space-y-6'>
					<div className='grid grid-cols-1 xl:grid-cols-[1fr_290px] gap-0 xl:gap-6'>
						<ProjectStatus />
						<div className='space-y-6 mt-6 xl:mt-0'>
							<CardV1
								title='Pendapatan'
								icon={<Wallet size={20} className='text-ink-primary' />}
							></CardV1>
							<CardV1
								title='Estimasi Pendapatan'
								icon={<Wallet size={20} className='text-ink-primary' />}
							></CardV1>
						</div>
					</div>
					<BarReport />
				</div>
				<div className='space-y-6'>
					<TopClient />
					<Attachment />
				</div>
			</div>
		</DefaultLayout>
	)
}

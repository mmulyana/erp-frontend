import TableReportOvertime from '@/features/hris/attendance/components/overtime/table-report'
import TableReportRegular from '@/features/hris/attendance/components/regular/table-report'

import { HrisLayout } from '@/shared/layout/hris-layout'
import { Card } from '@/shared/components/ui/card'
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from '@/shared/components/ui/tabs'

export default function ReportAttendance() {
	return (
		<HrisLayout>
			<Card className='p-0'>
				<Tabs defaultValue='tab-1'>
					<TabsList className='mt-6 before:bg-border relative h-auto w-full gap-2 bg-transparent p-0 before:absolute before:inset-x-0 before:bottom-0 before:h-px'>
						<TabsTrigger
							value='tab-1'
							className='ml-6 bg-muted overflow-hidden rounded-b-none border-x border-t px-6 py-2 data-[state=active]:z-10 data-[state=active]:shadow-none data-[state=active]:text-brand gap-2 group'
						>
							<p>Reguler</p>
						</TabsTrigger>
						<TabsTrigger
							value='tab-2'
							className='bg-muted overflow-hidden rounded-b-none border-x border-t px-6 py-2 data-[state=active]:z-10 data-[state=active]:shadow-none data-[state=active]:text-brand gap-2 group'
						>
							<p>Lembur</p>
						</TabsTrigger>
					</TabsList>
					<TabsContent value='tab-1'>
						<div className='p-6'>
							<TableReportRegular />
						</div>
					</TabsContent>
					<TabsContent value='tab-2'>
						<div className='p-6'>
							<TableReportOvertime />
						</div>
					</TabsContent>
				</Tabs>
			</Card>
		</HrisLayout>
	)
}

import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from '@/shared/components/ui/tabs'
import { ScrollArea, ScrollBar } from '@/shared/components/ui/scroll-area'
import { Card, CardContent } from '@/shared/components/ui/card'

import EmployeeCashAdvance from './employee-cash-advance'
import EmployeeCertificate from './employee-certificate'
import EmployeeOvertime from './employee-overtime'
import EmployeeRegular from './employee-regular'
import EmployeeProject from './employee-project'
import CardV1 from '@/shared/components/common/card-v1'
import { List } from 'lucide-react'

export default function CardDetail() {
	return (
		<CardV1
			title='Detail'
			icon={<List size={20} className='text-ink-primary' />}
			style={{ content: 'px-0' }}
		>
			<Tabs defaultValue='tab-1' className='w-full'>
				<ScrollArea className='w-full overflow-x-auto whitespace-nowrap'>
					<TabsList className='inline-flex h-auto w-full gap-2 bg-transparent py-0 relative before:absolute before:inset-x-0 before:bottom-0 before:h-px before:bg-border px-6 select-none !text-lg'>
						{[
							{ value: 'tab-1', label: 'Sertifikasi' },
							{ value: 'tab-2', label: 'Absensi Reguler' },
							{ value: 'tab-3', label: 'Lembur' },
							{ value: 'tab-4', label: 'Kasbon' },
							{ value: 'tab-5', label: 'Proyek' },
						].map((tab) => (
							<TabsTrigger
								key={tab.value}
								value={tab.value}
								className='overflow-hidden relative mt-3 !bg-transparent rounded-none px-3 pt-0 pb-2 data-[state=active]:z-10 data-[state=active]:shadow-none data-[state=active]:text-brand gap-2 group'
							>
								<div className='absolute w-full h-0.5 group-data-[state=active]:bg-brand bottom-0'></div>
								<p>{tab.label}</p>
							</TabsTrigger>
						))}
					</TabsList>
					<ScrollBar orientation='horizontal' className='absolute top-0' />
				</ScrollArea>

				<TabsContent value='tab-1'>
					<EmployeeCertificate />
				</TabsContent>
				<TabsContent value='tab-2'>
					<EmployeeRegular />
				</TabsContent>
				<TabsContent value='tab-3'>
					<EmployeeOvertime />
				</TabsContent>
				<TabsContent value='tab-4'>
					<EmployeeCashAdvance />
				</TabsContent>
				<TabsContent value='tab-5'>
					<EmployeeProject />
				</TabsContent>
			</Tabs>
		</CardV1>
	)
}

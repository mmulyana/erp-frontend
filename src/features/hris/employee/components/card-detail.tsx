import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/components/ui/tabs'
import { ScrollArea, ScrollBar } from '@/shared/components/ui/scroll-area'
import { Card, CardContent } from '@/shared/components/ui/card'

import EmployeeCashAdvance from './detail/employee-cash-advance'
import EmployeeCertificate from './detail/employee-certificate'
import EmployeeOvertime from './detail/employee-overtime'
import EmployeeRegular from './detail/employee-regular'
import EmployeeProject from './detail/employee-project'

export default function CardDetail() {
	return (
		<Card className='p-0 overflow-hidden'>
			<CardContent className='p-0'>
				<Tabs defaultValue='tab-1' className='w-full'>
					<ScrollArea className='w-full overflow-x-auto whitespace-nowrap'>
						<TabsList className='mt-6 inline-flex h-auto w-full gap-2 bg-transparent p-0 relative before:absolute before:inset-x-0 before:bottom-0 before:h-px before:bg-border px-6 select-none'>
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
									className='bg-muted overflow-hidden rounded-b-none border-x border-t px-6 py-2 data-[state=active]:z-10 data-[state=active]:shadow-none data-[state=active]:text-brand gap-2 group'
								>
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
			</CardContent>
		</Card>
	)
}

import { File, Plus } from 'lucide-react'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

import SearchV3 from '@/shared/component/search-v3'
import EmployeeCertificate from './employee-certificate'
import EmployeeAttendance from './employee-attendance'

export default function CardDetail() {
	return (
		<Card className='p-0 overflow-hidden'>
			<CardContent className='p-0'>
				<Tabs defaultValue='tab-1'>
					<TabsList className='mt-6 before:bg-border relative h-auto w-full gap-2 bg-transparent p-0 before:absolute before:inset-x-0 before:bottom-0 before:h-px'>
						<TabsTrigger
							value='tab-1'
							className='ml-6 bg-muted overflow-hidden rounded-b-none border-x border-t px-6 py-2 data-[state=active]:z-10 data-[state=active]:shadow-none data-[state=active]:text-brand gap-2 group'
						>
							<p>Sertifikasi</p>
						</TabsTrigger>
						<TabsTrigger
							value='tab-2'
							className='bg-muted overflow-hidden rounded-b-none border-x border-t px-6 py-2 data-[state=active]:z-10 data-[state=active]:shadow-none data-[state=active]:text-brand gap-2 group'
						>
							<p>Kehadiran</p>
						</TabsTrigger>
						<TabsTrigger
							value='tab-3'
							className='bg-muted overflow-hidden rounded-b-none border-x border-t px-6 py-2 data-[state=active]:z-10 data-[state=active]:shadow-none data-[state=active]:text-brand gap-2 group'
						>
							<p>Kasbon</p>
						</TabsTrigger>
						<TabsTrigger
							value='tab-4'
							className='bg-muted overflow-hidden rounded-b-none border-x border-t px-6 py-2 data-[state=active]:z-10 data-[state=active]:shadow-none data-[state=active]:text-brand gap-2 group'
						>
							<p>Proyek</p>
						</TabsTrigger>
					</TabsList>
					<TabsContent value='tab-1'>
						<EmployeeCertificate />
					</TabsContent>
					<TabsContent value='tab-2'>
						<EmployeeAttendance />
					</TabsContent>
				</Tabs>
			</CardContent>
		</Card>
	)
}

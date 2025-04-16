import { CalendarClock } from 'lucide-react'

import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/shared/components/ui/tabs'
import { ScrollArea } from '@/shared/components/ui/scroll-area'
import { Card, CardTitle } from '@/shared/components/ui/card'
import { cn } from '@/shared/utils/cn'
import { format } from 'date-fns'

const certificationReminders = [
	{
		name: 'Saepuddin',
		title: 'Pembinaan pengawasan norma keselamatan dan kesehatan kerja K3',
		expiredAt: new Date(),
		photoUrl: 'https://avatars.githubusercontent.com/u/96921234?v=4',
	},
	{
		name: 'Saepuddin',
		title: 'Pembinaan pengawasan norma keselamatan dan kesehatan kerja K3',
		expiredAt: new Date(),
		photoUrl: 'https://avatars.githubusercontent.com/u/96921234?v=4',
	},
	{
		name: 'Saepuddin',
		title: 'Pembinaan pengawasan norma keselamatan dan kesehatan kerja K3',
		expiredAt: new Date(),
		photoUrl: 'https://avatars.githubusercontent.com/u/96921234?v=4',
	},
	{
		name: 'Saepuddin',
		title: 'Pembinaan pengawasan norma keselamatan dan kesehatan kerja K3',
		expiredAt: new Date(),
		photoUrl: 'https://avatars.githubusercontent.com/u/96921234?v=4',
	},
	{
		name: 'Saepuddin',
		title: 'Pembinaan pengawasan norma keselamatan dan kesehatan kerja K3',
		expiredAt: new Date(),
		photoUrl: 'https://avatars.githubusercontent.com/u/96921234?v=4',
	},
]

const safetyReminders = [
	{
		name: 'Saepuddin',
		expiredAt: new Date(),
		photoUrl: 'https://avatars.githubusercontent.com/u/96921234?v=4',
	},
	{
		name: 'Saepuddin',
		expiredAt: new Date(),
		photoUrl: 'https://avatars.githubusercontent.com/u/96921234?v=4',
	},
	{
		name: 'Saepuddin',
		expiredAt: new Date(),
		photoUrl: 'https://avatars.githubusercontent.com/u/96921234?v=4',
	},
	{
		name: 'Saepuddin',
		expiredAt: new Date(),
		photoUrl: 'https://avatars.githubusercontent.com/u/96921234?v=4',
	},
	{
		name: 'Saepuddin',
		expiredAt: new Date(),
		photoUrl: 'https://avatars.githubusercontent.com/u/96921234?v=4',
	},
]

export default function Reminder() {
	return (
		<Card className='col-span-2 h-fit'>
			<div className='pt-6 px-6 flex items-center gap-3'>
				<CalendarClock strokeWidth={2} className='text-[#C0C1CB]' />
				<CardTitle className='text-ink-secondary text-base'>
					Pengingat
				</CardTitle>
			</div>

			<Tabs defaultValue='tab-1'>
				<TabsList className='mt-6 before:bg-border relative h-auto w-full gap-2 bg-transparent p-0 before:absolute before:inset-x-0 before:bottom-0 before:h-px'>
					<TabsTrigger
						value='tab-1'
						className='ml-6 bg-muted overflow-hidden rounded-b-none border-x border-t px-6 py-2 data-[state=active]:z-10 data-[state=active]:shadow-none data-[state=active]:text-brand gap-2 group'
					>
						<p>Sertifikasi</p>
						<div className='h-[22px] w-[22px] pr-[1px] rounded-full bg-border flex items-center justify-center text-sm group-data-[state=active]:bg-brand group-data-[state=active]:text-white font-medium'>
							4
						</div>
					</TabsTrigger>
					<TabsTrigger
						value='tab-2'
						className='bg-muted overflow-hidden rounded-b-none border-x border-t px-6 py-2 data-[state=active]:z-10 data-[state=active]:shadow-none data-[state=active]:text-brand gap-2 group'
					>
						<p>Safety Induction</p>
						<div className='h-[22px] w-[22px] pr-[1px] rounded-full bg-border flex items-center justify-center text-sm group-data-[state=active]:bg-brand group-data-[state=active]:text-white font-medium'>
							4
						</div>
					</TabsTrigger>
				</TabsList>
				<TabsContent value='tab-1'>
					<ScrollArea className='h-80 w-full px-6'>
						{certificationReminders.map((item, index) => (
							<div
								key={index}
								className={cn(
									'grid grid-cols-[40px_1fr] gap-4 mb-6',
									index === 0 && 'mt-2'
								)}
							>
								<img src={item.photoUrl} className='h-10 w-10 rounded-full' />
								<div className=''>
									<p className='text-ink-secondary'>{item.name}</p>
									<p className='text-ink-primary'>{item.title}</p>
									<div className='flex items-center gap-2'>
										<p className='text-ink-light'>
											tanggal kadaluwarsa:{' '}
											<span className='text-ink-primary'>
												{format(item.expiredAt, 'dd/MM/yyyy')}
											</span>
										</p>
										<div className='w-1 h-1 rounded-full bg-ink-light'></div>
									</div>
								</div>
							</div>
						))}
					</ScrollArea>
				</TabsContent>
				<TabsContent value='tab-2'>
					<ScrollArea className='h-80 w-full px-6'>
						{safetyReminders.map((item, index) => (
							<div
								key={index}
								className={cn(
									'grid grid-cols-[40px_1fr] gap-4 mb-6',
									index === 0 && 'mt-2'
								)}
							>
								<img src={item.photoUrl} className='h-10 w-10 rounded-full' />
								<div className=''>
									<p className='text-ink-secondary'>{item.name}</p>
									<div className='flex items-center gap-2'>
										<p className='text-ink-light'>
											tanggal kadaluwarsa:{' '}
											<span className='text-ink-primary'>
												{format(item.expiredAt, 'dd/MM/yyyy')}
											</span>
										</p>
										<div className='w-1 h-1 rounded-full bg-ink-light'></div>
									</div>
								</div>
							</div>
						))}
					</ScrollArea>
				</TabsContent>
			</Tabs>
		</Card>
	)
}

import { CalendarClock, Image } from 'lucide-react'

import {
	Tabs,
	TabsList,
	TabsTrigger,
	TabsContent,
} from '@/shared/components/ui/tabs'
import { ScrollArea } from '@/shared/components/ui/scroll-area'
import { Card, CardTitle } from '@/shared/components/ui/card'
import { cn } from '@/shared/utils/cn'
import { differenceInDays, format, formatDistanceToNow } from 'date-fns'
import { useExpireCertificate } from '../api/use-expire-certificate'
import { useExpireSafetyInduction } from '../api/use-expire-safety-induction'
import { id } from 'date-fns/locale'
import { convertUTCToWIB } from '@/shared/utils'

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
					<CertificationContent />
				</TabsContent>
				<TabsContent value='tab-2'></TabsContent>
			</Tabs>
		</Card>
	)
}

function CertificationContent() {
	const { data } = useExpireCertificate({
		day: 30,
	})

	return (
		<ScrollArea className='h-80 w-full px-6'>
			{data?.data?.map((item, index) => (
				<div
					key={index}
					className={cn(
						'grid grid-cols-[40px_1fr] gap-4 mb-6',
						index === 0 && 'mt-2'
					)}
				>
					{item.employee.photoUrl ? (
						<img
							src={item.employee.photoUrl}
							className='h-10 w-10 rounded-full'
						/>
					) : (
						<div className='h-10 w-10 rounded-full border border-dashed border-gray-300 flex items-center justify-center bg-gray-50'>
							<Image className='text-ink-light' size={16} />
						</div>
					)}
					<div className=''>
						<p className='text-ink-secondary'>{item.employee.fullname}</p>
						<p className='text-ink-primary'>{item.name}</p>
						<div className='flex items-center gap-2'>
							<p className='text-ink-light'>
								tanggal kadaluwarsa:{' '}
								<span className='text-ink-primary'>
									{format(item.expiryDate, 'dd/MM/yyyy')}
								</span>
							</p>
							<div className='w-1 h-1 rounded-full bg-ink-light'></div>
							<p>
								{formatDistanceToNow(
									convertUTCToWIB(new Date(item.expiryDate).toString()),
									{
										addSuffix: true,
										locale: id,
									}
								)}
							</p>
						</div>
					</div>
				</div>
			))}
		</ScrollArea>
	)
}

function SafetyContent() {
	const { data } = useExpireSafetyInduction({
		day: 30,
	})

	console.log('data', data)

	return (
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
	)
}

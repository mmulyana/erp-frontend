import { CalendarClock, Image } from 'lucide-react'
import { format } from 'date-fns'

import { ScrollArea, ScrollBar } from '@/shared/components/ui/scroll-area'
import { Card, CardTitle } from '@/shared/components/ui/card'
import { Badge } from '@/shared/components/ui/badge'
import { baseUrl } from '@/shared/constants/urls'
import { cn } from '@/shared/utils/cn'
import {
	Tabs,
	TabsList,
	TabsTrigger,
	TabsContent,
} from '@/shared/components/ui/tabs'

import { useExpireSafetyInduction } from '../api/use-expire-safety-induction'
import { useExpireCertificate } from '../api/use-expire-certificate'

export default function Reminder() {
	const { data: dataCertif } = useExpireCertificate({
		day: 30,
	})
	const { data: dataSafety } = useExpireSafetyInduction({
		day: 30,
	})

	return (
		<Card className='col-span-2 h-fit'>
			<div className='pt-6 px-6 flex items-center gap-3'>
				<CalendarClock strokeWidth={2} className='text-[#C0C1CB]' />
				<CardTitle className='text-ink-secondary text-base'>
					Pengingat
				</CardTitle>
			</div>

			<Tabs defaultValue='tab-1'>
				<ScrollArea>
					<TabsList className='mt-6 before:bg-border relative h-auto w-full gap-2 bg-transparent p-0 before:absolute before:inset-x-0 before:bottom-0 before:h-px'>
						<TabsTrigger
							value='tab-1'
							className='ml-6 bg-muted overflow-hidden rounded-b-none border-x border-t px-6 py-2 data-[state=active]:z-10 data-[state=active]:shadow-none data-[state=active]:text-brand gap-2 group'
						>
							<p>Sertifikasi</p>
							<div className='h-[22px] w-[22px] pr-[1px] rounded-full bg-border flex items-center justify-center text-sm group-data-[state=active]:bg-brand group-data-[state=active]:text-white font-medium'>
								{dataCertif?.data?.length}
							</div>
						</TabsTrigger>
						<TabsTrigger
							value='tab-2'
							className='bg-muted overflow-hidden rounded-b-none border-x border-t px-6 py-2 data-[state=active]:z-10 data-[state=active]:shadow-none data-[state=active]:text-brand gap-2 group'
						>
							<p>Safety Induction</p>
							<div className='h-[22px] w-[22px] pr-[1px] rounded-full bg-border flex items-center justify-center text-sm group-data-[state=active]:bg-brand group-data-[state=active]:text-white font-medium'>
								{dataSafety?.data?.length}
							</div>
						</TabsTrigger>
					</TabsList>
					<ScrollBar orientation='horizontal' />
				</ScrollArea>
				<TabsContent value='tab-1'>
					<CertificationContent />
				</TabsContent>
				<TabsContent value='tab-2'>
					<SafetyContent />
				</TabsContent>
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
			{data?.data?.map((item, index) => {
				const isOver = item.expireUntil < 0
				const dayCount = Math.abs(item.expireUntil)
				return (
					<div
						key={index}
						className={cn(
							'grid grid-cols-[40px_1fr] gap-4 mb-6',
							index === 0 && 'mt-2'
						)}
					>
						{item.employee.photoUrl ? (
							<img
								src={`${baseUrl}/${item.employee.photoUrl}`}
								className='h-10 w-10 rounded-full'
							/>
						) : (
							<div className='h-10 w-10 rounded-full border border-dashed border-gray-300 flex items-center justify-center bg-gray-50'>
								<Image className='text-ink-light' size={16} />
							</div>
						)}
						<div>
							<p className='text-ink-secondary'>{item.employee.fullname}</p>
							<p className='text-ink-primary'>{item.name}</p>
							<div className='flex items-center gap-2 flex-wrap'>
								<p className='text-ink-light'>
									tanggal kadaluwarsa:{' '}
									<span className='text-ink-primary'>
										{format(item.expiryDate, 'dd/MM/yyyy')}
									</span>
								</p>
								<div className='w-1 h-1 rounded-full bg-ink-light'></div>
								<Badge variant={!isOver ? 'outline' : 'destructive'}>
									{isOver && 'Sudah lewat'} {dayCount + 1}{' '}
									{!isOver ? 'hari lagi' : 'hari'}
								</Badge>
							</div>
						</div>
					</div>
				)
			})}
		</ScrollArea>
	)
}

function SafetyContent() {
	const { data } = useExpireSafetyInduction({
		day: 30,
	})

	return (
		<ScrollArea className='h-80 w-full px-6'>
			{data?.data?.map((item, index) => {
				const isOver = item.expireUntil < 0
				const dayCount = Math.abs(item.expireUntil)

				return (
					<div
						key={index}
						className={cn(
							'grid grid-cols-[40px_1fr] gap-4 mb-6',
							index === 0 && 'mt-2'
						)}
					>
						{item.photoUrl ? (
							<img
								src={`${baseUrl}/${item.photoUrl}`}
								className='h-10 w-10 rounded-full'
							/>
						) : (
							<div className='h-10 w-10 rounded-full border border-dashed border-gray-300 flex items-center justify-center bg-gray-50'>
								<Image className='text-ink-light' size={16} />
							</div>
						)}
						<div>
							<p className='text-ink-secondary'>{item.fullname}</p>
							<div className='flex items-center gap-2 flex-wrap'>
								<p className='text-ink-light'>
									tanggal kadaluwarsa:{' '}
									<span className='text-ink-primary'>
										{format(item.safetyInductionDate as string, 'dd/MM/yyyy')}
									</span>
								</p>
								<div className='w-1 h-1 rounded-full bg-ink-light'></div>
								<Badge variant={!isOver ? 'outline' : 'destructive'}>
									{isOver && 'Sudah lewat'} {dayCount + 1}{' '}
									{!isOver ? 'hari lagi' : 'hari'}
								</Badge>
							</div>
						</div>
					</div>
				)
			})}
		</ScrollArea>
	)
}

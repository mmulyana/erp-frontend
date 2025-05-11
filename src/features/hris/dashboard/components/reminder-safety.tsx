import { Link } from 'react-router-dom'
import { Bell } from 'lucide-react'

import PhotoUrl from '@/shared/components/common/photo-url'
import CardV1 from '@/shared/components/common/card-v1'
import { Badge } from '@/shared/components/ui/badge'
import { cn } from '@/shared/utils/cn'

import { useExpireSafetyInduction } from '../api/use-expire-safety-induction'
import { ScrollArea } from '@/shared/components/ui/scroll-area'

export default function ReminderSafety() {
	const { data } = useExpireSafetyInduction({
		day: 30,
	})

	return (
		<CardV1
			title='Safety Induction'
			icon={<Bell size={20} className='text-ink-primary' />}
			style={{ card: 'h-[330px]' }}
		>
			<ScrollArea className='h-[280px]'>
				{data?.data?.map((item, index) => {
					const isOver = item.expireUntil < 0
					const dayCount = Math.abs(item.expireUntil)
					return (
						<div
							key={index}
							className={cn(
								'flex justify-between items-center mb-7',
								index === 0 && 'mt-8'
							)}
						>
							<div className='flex gap-4 items-center'>
								<PhotoUrl url={item.photoUrl} style={{ img: 'w-10 h-10' }} />
								<div>
									<Link
										to={`/hris/masterdata/employee/${item.id}`}
										className='text-ink-primary leading-none font-medium'
									>
										{item.fullname}
									</Link>
									<p className='text-ink-primary/50 leading-none'>
										{item.position}
									</p>
								</div>
							</div>
							<Badge variant={!isOver ? 'outline' : 'destructive'}>
								{isOver && 'Sudah lewat'} {dayCount + 1}{' '}
								{!isOver ? 'hari lagi' : 'hari'}
							</Badge>
						</div>
					)
				})}
			</ScrollArea>
		</CardV1>
	)
}

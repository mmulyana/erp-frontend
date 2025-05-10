import { Bell } from 'lucide-react'
import { format } from 'date-fns'

import PhotoUrl from '@/shared/components/common/photo-url'
import CardV1 from '@/shared/components/common/card-v1'
import { Badge } from '@/shared/components/ui/badge'
import { cn } from '@/shared/utils/cn'

import { useExpireSafetyInduction } from '../api/use-expire-safety-induction'

export default function ReminderSafety() {
	const { data } = useExpireSafetyInduction({
		day: 30,
	})

	return (
		<CardV1
			title='Safety Induction'
			icon={<Bell size={20} className='text-ink-primary' />}
			style={{ card: 'min-h-[400px]' }}
		>
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
						<PhotoUrl url={item.photoUrl} style={{ img: 'w-10 h-10' }} />
						<div>
							<p className='text-ink-secondary'>{item.fullname}</p>
							<p className='text-ink-primary'>{item.position}</p>
							<div className='flex items-center gap-2 flex-wrap'>
								<p className='text-ink-light'>
									tanggal kadaluwarsa:{' '}
									<span className='text-ink-primary'>
										{format(item.expireUntil, 'dd/MM/yyyy')}
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
		</CardV1>
	)
}

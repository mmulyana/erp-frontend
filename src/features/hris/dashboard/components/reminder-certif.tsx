import { Link } from 'react-router-dom'
import { Bell } from 'lucide-react'

import PhotoUrl from '@/shared/components/common/photo-url'
import CardV1 from '@/shared/components/common/card-v1'
import { Badge } from '@/shared/components/ui/badge'
import { cn } from '@/shared/utils/cn'

import { useExpireCertificate } from '../api/use-expire-certificate'

export default function ReminderCertif() {
	const { data } = useExpireCertificate({
		day: 30,
	})

	return (
		<CardV1
			title='Sertifikasi'
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
							'flex justify-between items-center mb-7',
							index === 0 && 'mt-8'
						)}
					>
						<div className='flex items-start gap-4'>
							<PhotoUrl
								url={item.employee.photoUrl}
								style={{ img: 'w-10 h-10' }}
							/>
							<div>
								<Link
									to={`/hris/masterdata/employee/${item.employee.id}`}
									className='text-ink-primary font-medium'
								>
									{item.employee.fullname}
								</Link>
								<p className='text-ink-primary/50'>{item.name}</p>
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

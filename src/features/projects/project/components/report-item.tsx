import { cn } from '@/shared/utils/cn'
import { useReport } from '../api/report/use-report'
import { warningTypes } from '../constant/types'
import {
	AlertTriangle,
	Image,
	MessageSquare,
	MessageSquareMoreIcon,
	Calendar,
} from 'lucide-react'
import PhotoUrl from '@/shared/components/common/photo-url'
import { Link } from 'react-router-dom'
import { paths } from '@/shared/constants/paths'
import { format } from 'date-fns'
import { id as ind } from 'date-fns/locale'

type ReportItemProps = {
	item: any
	isLast: boolean
	isWarning: boolean
	variant?: 'dashboard' | string
	onClick?: () => void
}

export default function ReportItem({
	item,
	isLast,
	isWarning,
	variant,
	onClick,
}: ReportItemProps) {
	return (
		<div className='flex' key={item.id}>
			<div className='w-14 min-h-full relative'>
				<div
					className={cn(
						'z-10 h-8 w-8 rounded-full bg-brand text-white flex justify-center items-center absolute left-1/2 -translate-x-1/2',
						isWarning && 'bg-error'
					)}
				>
					{isWarning ? (
						<AlertTriangle size={18} strokeWidth={2.5} />
					) : (
						<MessageSquare fill='#FFF' size={16} />
					)}
				</div>
				<div
					className={cn(
						'bg-ink-primary/10 absolute h-[calc(100%+28px)] w-0.5 left-1/2 -translate-x-1/2',
						isLast && 'h-0'
					)}
				/>
			</div>
			<div
				className='py-4 px-6 w-full rounded-xl border border-border bg-white'
				onClick={onClick}
			>
				<div className='grid grid-cols-[40px_1fr] gap-4'>
					<PhotoUrl
						url={item.user.photoUrl || ''}
						style={{ img: 'w-10 h-10' }}
					/>
					<div>
						<p className='text-ink-primary font-medium lowercase mb-2'>
							{item.user.username}{' '}
							<span className='opacity-50 font-normal'>
								{isWarning ? 'Melaporkan' : 'Menambahkan laporan'}{' '}
							</span>
							{item.type}{' '}
							{variant === 'dashboard' && (
								<>
									<span className='opacity-50 font-normal'>di </span>
									<Link
										to={`${paths.projectMasterdataProjects}/${item.project.id}`}
									>
										{item.project.name}
									</Link>
								</>
							)}
						</p>
						<p>"{item.message}"</p>
					</div>
				</div>
				<div className='flex gap-4 items-center pl-14 pt-4'>
					<div className='flex gap-2 items-center'>
						<MessageSquareMoreIcon size={20} className='text-[#959597]' />
						<p className='text-[#959597]'>{item._count.comments}</p>
					</div>
					<div className='flex gap-2 items-center'>
						<Image size={20} className='text-[#959597]' />
						<p className='text-[#959597]'>{item._count.attachments}</p>
					</div>
					<div className='flex gap-2 items-center ml-0 md:ml-auto'>
						<Calendar size={20} className='text-[#959597]' />
						<p className='text-[#959597]'>
							{format(new Date(item.createdAt), 'PPP', { locale: ind })}
						</p>
					</div>
				</div>
			</div>
		</div>
	)
}

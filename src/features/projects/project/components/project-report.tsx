import { Button } from '@/shared/components/ui/button'
import { ScrollArea } from '@/shared/components/ui/scroll-area'
import { ModalAddReport } from './modal-add-report'
import { useReports } from '../api/report/use-reports'
import PhotoUrl from '@/shared/components/common/photo-url'
import {
	AlertTriangle,
	Calendar,
	History,
	Image,
	MessageSquare,
	MessageSquareMoreIcon,
} from 'lucide-react'
import { format } from 'date-fns'
import { id } from 'date-fns/locale'
import React from 'react'
import { cn } from '@/shared/utils/cn'
import { warningTypes } from '../constant/types'
import { Link } from 'react-router-dom'
import { paths } from '@/shared/constants/paths'

type props = {
	projectId?: string
	variant?: 'dashboard' | 'detail'
	limit?: number
}
export default function ProjectReport({ projectId, variant, limit }: props) {
	const { data } = useReports({ projectId, limit: String(limit) })

	return (
		<div className={cn(variant === 'detail' && 'pt-6')}>
			<div className='flex justify-between items-start md:items-center'>
				<div className='flex gap-2 items-center'>
					{variant === 'detail' ? (
						<>
							<p className='text-ink-secondary font-medium'>Laporan</p>
							<div className='bg-[#e3e3e3] rounded-md px-2 py-0.5'>
								<p className='text-xs text-ink-primary font-medium'>
									{data?.data.data.length}
								</p>
							</div>
						</>
					) : (
						<>
							<History size={20} className='text-ink-primary' />
							<p className='text-ink-secondary font-medium mb-2'>
								Laporan Terbaru
							</p>
						</>
					)}
				</div>

				{variant === 'detail' && (
					<div className='flex gap-2 items-center flex-wrap justify-end md:justify-between'>
						<ModalAddReport projectId={projectId} />
					</div>
				)}
			</div>
			<ScrollArea className='mb-4 h-[320px]'>
				<div className='space-y-4 pt-4'>
					{data?.data.data.map((i, index) => {
						const isWarning = warningTypes.includes(i.type)

						return (
							<div className='flex' key={i.id}>
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
											index === data.data.data.length - 1 && 'h-0'
										)}
									></div>
								</div>
								<div className='py-4 px-6 w-full rounded-xl border border-border bg-white'>
									<div className='grid grid-cols-[40px_1fr] gap-4'>
										<PhotoUrl
											url={i.user.photoUrl || ''}
											style={{ img: 'w-10 h-10' }}
										/>
										<div>
											<p className='text-ink-primary font-medium lowercase mb-2'>
												{i.user.username}{' '}
												<span className='opacity-50 font-normal'>
													{warningTypes.includes(i.type)
														? 'Melaporkan'
														: 'Menambahkan laporan'}{' '}
												</span>
												{i.type}{' '}
												{variant === 'dashboard' && (
													<>
														<span className='opacity-50 font-normal'>di </span>
														<Link
															to={`${paths.projectMasterdataProjects}/${i.project.id}`}
														>
															{i.project.name}
														</Link>
													</>
												)}
											</p>

											<p>"{i.message}"</p>
										</div>
									</div>
									<div className='flex gap-4 items-center pl-14 pt-4'>
										<div className='flex gap-2 items-center'>
											<MessageSquareMoreIcon
												size={20}
												className='text-[#959597]'
											/>
											<p className='text-[#959597]'>{i._count.comments}</p>
										</div>
										<div className='flex gap-2 items-center'>
											<Image size={20} className='text-[#959597]' />
											<p className='text-[#959597]'>{i._count.attachments}</p>
										</div>
										<div className='flex gap-2 items-center ml-0 md:ml-auto'>
											<Calendar size={20} className='text-[#959597]' />
											<p className='text-[#959597]'>
												{format(new Date(i.createdAt), 'PPP', { locale: id })}
											</p>
										</div>
									</div>
								</div>
							</div>
						)
					})}
				</div>
			</ScrollArea>
		</div>
	)
}

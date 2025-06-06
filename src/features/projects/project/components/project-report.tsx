import { History } from 'lucide-react'
import { useEffect, useState } from 'react'

import { ScrollArea } from '@/shared/components/ui/scroll-area'
import { cn } from '@/shared/utils/cn'

import { useReports } from '../api/report/use-reports'
import { ModalAddReport } from './modal-add-report'
import { warningTypes } from '../constant/types'
import ReportDetail from './report-detail'
import ReportItem from './report-item'

type props = {
	projectId?: string
	variant?: 'dashboard' | 'detail'
	limit?: number
}
export default function ProjectReport({ projectId, variant, limit }: props) {
	const { data, refetch } = useReports({ projectId, limit: String(limit) })
	const [open, setOpen] = useState(false)
	const [id, setId] = useState('')

	useEffect(() => {
		if (!open) {
			refetch()
		}
	}, [open])

	return (
		<>
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
								<ReportItem
									key={i.id}
									item={i}
									variant={variant}
									isWarning={isWarning}
									isLast={index === data.data.data.length - 1}
									onClick={() => {
										setId(i.id)
										setOpen(true)
									}}
								/>
							)
						})}
					</div>
				</ScrollArea>
			</div>
			<ReportDetail open={open} setOpen={setOpen} id={id} />
		</>
	)
}

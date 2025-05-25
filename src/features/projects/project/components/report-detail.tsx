import { Dialog, DialogContent } from '@/shared/components/ui/dialog'
import { useIsMobile } from '@/shared/hooks/use-mobile'
import { cn } from '@/shared/utils/cn'

import { useReport } from '../api/report/use-report'
import ReportAttachment from './report-attachment'
import ReportComment from './report-comment'

export default function ReportDetail({
	id,
	open,
	setOpen,
}: {
	id?: string
	open: boolean
	setOpen: (val: boolean) => void
}) {
	const { data } = useReport({ id })
	const imagesLength = data?.data?.attachments.length || 0

	const isMobile = useIsMobile()

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogContent
				className={cn(
					'min-h-screen md:min-h-min md:h-[80vh] w-full p-0 overflow-hidden',
					!!imagesLength && 'max-w-6xl '
				)}
				showClose={isMobile}
			>
				<div className='flex flex-col md:flex-row h-full pt-12 md:pt-0'>
					<ReportAttachment id={id} />
					<ReportComment id={id} />
				</div>
			</DialogContent>
		</Dialog>
	)
}

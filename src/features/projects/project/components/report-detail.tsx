import { Dialog, DialogContent } from '@/shared/components/ui/dialog'
import { useIsMobile } from '@/shared/hooks/use-mobile'
import { cn } from '@/shared/utils/cn'

import { useReport } from '../api/report/use-report'
import ReportAttachment from './report-attachment'
import ReportComment from './report-comment'
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from '@/shared/components/ui/tabs'
import PhotoGrid from '@/shared/components/common/photo-grid'

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
				{isMobile ? (
					<Tabs defaultValue='tab-1' className='items-center'>
						<TabsList className='h-auto w-full rounded-none border-b bg-transparent px-4 pt-4'>
							<TabsTrigger
								value='tab-1'
								className='data-[state=active]:after:bg-brand data-[state=active]:!text-brand relative rounded-none py-2 after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=inactive]:bg-transparent'
							>
								Komentar
							</TabsTrigger>
							<TabsTrigger
								value='tab-2'
								className='data-[state=active]:after:bg-brand data-[state=active]:!text-brand relative rounded-none py-2 after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=inactive]:bg-transparent'
							>
								Lampiran
							</TabsTrigger>
						</TabsList>
						<TabsContent className='w-full' value='tab-1'>
							<ReportComment id={id} />
						</TabsContent>
						<TabsContent value='tab-2' className='w-full'>
							<PhotoGrid
								urls={data?.data.attachments?.map((i) => i.photoUrl) || []}
							/>
						</TabsContent>
					</Tabs>
				) : (
					<div className='flex flex-col md:flex-row h-full pt-12 md:pt-0'>
						<ReportAttachment id={id} />
						<ReportComment id={id} />
					</div>
				)}
			</DialogContent>
		</Dialog>
	)
}

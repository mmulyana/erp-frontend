import {
	File as FileIcon,
	FileText,
	Image as ImageIcon,
	MessageSquareText,
} from 'lucide-react'

type Attachment = {
	type: 'file' | 'image'
	name: string
	size: string
	url?: string
}

export type ReportCardProps = {
	avatarUrl: string
	name: string
	activity: string
	timestamp: string
	message: string
	attachments: Attachment[]
}

export default function ReportItem({
	avatarUrl,
	name,
	activity,
	timestamp,
	message,
	attachments,
}: ReportCardProps) {
	return (
		<div className='w-full flex gap-6 pt-4'>
			<div className='w-8 relative'>
				<div className='w-8 h-8 rounded-full bg-[#e5e8f6] z-10 relative flex justify-center items-center'>
					<MessageSquareText className='text-brand' size={18} />
				</div>
				<div className='absolute h-[calc(100%+18px)] w-[1px] bg-[#e6e6e6] left-1/2 -translate-x-1/2 top-0'></div>
			</div>
			<div className='w-full flex flex-col gap-4'>
				<div className='flex items-center space-x-3'>
					<div className='w-10 h-10 rounded-full bg-gray-400' />
					<div className='flex gap-1 items-center'>
						<span className='font-medium text-sm text-ink-primary'>{name}</span>
						<span className='text-gray-500 text-sm'> {activity}</span>
						<div className='text-ink-primary text-sm'>{timestamp}</div>
					</div>
				</div>

				{/* Message */}
				<div className='text-sm text-gray-800 bg-white p-4 rounded-lg border border-border w-full'>
					{message}
				</div>

				{/* Attachments */}
				<div className='flex flex-wrap gap-2'>
					{attachments.slice(0, 2).map((attachment, index) => (
						<div
							key={index}
							className='flex items-center space-x-2 bg-[#F0F0F0] rounded-md p-2 pr-4 text-xs w-fit'
						>
							{attachment.type === 'file' ? (
								<FileText className='w-6 h-6 text-ink-light' />
							) : attachment.type === 'image' && attachment.url ? (
								<img
									src={attachment.url}
									alt={attachment.name}
									className='w-6 h-6 rounded-sm object-cover'
								/>
							) : (
								<ImageIcon className='w-6 h-6 text-gray-500' />
							)}

							<div className='flex flex-col'>
								<span className='font-medium'>{attachment.name}</span>
								<span className='text-gray-500'>{attachment.size}</span>
							</div>
						</div>
					))}

					{attachments.length > 2 && (
						<div className='flex items-center justify-center bg-gray-100 rounded-md px-3 py-2 text-xs font-medium text-gray-600 w-fit'>
							+{attachments.length - 2} lainnya
						</div>
					)}
				</div>
			</div>
		</div>
	)
}

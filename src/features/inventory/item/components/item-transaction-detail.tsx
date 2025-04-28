import PhotoUrl from '@/shared/components/common/photo-url'
import {
	File as FileIcon,
	FileText,
	Image as ImageIcon,
	MessageSquareText,
} from 'lucide-react'
import { format } from 'date-fns'
import { id } from 'date-fns/locale'
import { Link } from 'react-router-dom'

type Attachment = {
	type: 'file' | 'image'
	name: string
	size: string
	url?: string
}

export type ReportCardProps = {
	user: { photoUrl: string; username: string }
	qty: number
	createdAt?: string
	type?: 'stock-in' | 'stock-out' | 'loan'
	evidenceUrl?: string
}

export default function ItemTransactionDetail({
	user,
	qty,
	createdAt,
	evidenceUrl,
}: ReportCardProps) {
	return (
		<div className='w-full flex gap-4 pt-4'>
			<div className='w-9 relative'>
				<div className='w-9 h-9 rounded-full bg-[#e5e8f6] z-10 relative flex justify-center items-center'>
					<PhotoUrl url={user.photoUrl} style={{ img: 'w-full h-full' }} />
				</div>
				<div className='absolute h-[calc(100%+18px)] w-[1px] bg-[#e6e6e6] left-1/2 -translate-x-1/2 top-0'></div>
			</div>
			<div className='w-full flex flex-col gap-2 pt-2'>
				<div className='flex items-center'>
					<div className='flex gap-2 items-center  flex-wrap'>
						<span className='font-medium text-sm text-ink-primary'>
							{user.username}
						</span>
						<p className='text-ink-light'>Menambahkan stock sebanyak</p>
						<p className='text-ink-primary font-medium'>{qty}</p>
						<div className='w-1 h-1 rounded-full bg-gray-400'></div>
						<p>{format(new Date(), 'PPP', { locale: id })}</p>
					</div>
				</div>

				<div className='flex flex-wrap items-center gap-2'>
					<div className='flex items-center space-x-2 bg-[#F0F0F0] rounded-md p-2 pr-4 text-xs w-fit'>
						<ImageIcon className='w-6 h-6 text-gray-500' />

						<div className='flex flex-col'>
							<span className='font-medium'>IMG_1244.jpeg</span>
							<span className='text-gray-500'>12 MB</span>
						</div>
					</div>
					<Link className='underline text-brand' to='/'>
						Lihat transaksi
					</Link>
				</div>
			</div>
		</div>
	)
}

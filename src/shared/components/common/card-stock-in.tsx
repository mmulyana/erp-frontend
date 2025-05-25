import { ExternalLink, Eye } from 'lucide-react'
import { Link } from 'react-router-dom'
import { id } from 'date-fns/locale'
import { format } from 'date-fns'

import { baseUrl } from '@/shared/constants/urls'
import { StockIn } from '@/shared/types/api'
import { paths } from '@/shared/constants/paths'

import { Card, CardContent } from '../ui/card'
import PhotoUrl from './photo-url'

export default function CardStockIn({ data }: { data: StockIn }) {
	return (
		<Card className='p-6'>
			<CardContent className='p-0'>
				<div className='flex justify-between items-center mb-6'>
					<p>{format(new Date(data.date), 'PPP', { locale: id })}</p>
					<Link
						className='flex gap-2 items-center'
						to={`${paths.inventoryStockIn}/${data.id}`}
					>
						<span className='px-0.5'>Lihat transaksi</span>
						<ExternalLink size={16} className='text-ink-primary' />
					</Link>
				</div>
				<div className='flex justify-between items-end'>
					<div className='space-y-2 w-[240px]'>
						<div className='flex justify-between items-center'>
							<p className='text-ink-primary/50'>Total barang</p>
							<p className='text-ink-primary'>{data?.items?.length || 0}</p>
						</div>
						<div className='flex justify-between items-center'>
							<p className='text-ink-primary/50'>Nomor Referensi</p>
							<p className='text-ink-primary'>{data.referenceNumber}</p>
						</div>
						<div className='flex justify-between items-center'>
							<p className='text-ink-primary/50'>Bukti foto</p>
							{data.photoUrl && (
								<Link
									className='flex gap-2 items-center'
									to={`${baseUrl}/${data.photoUrl}`}
								>
									<span className='px-0.5'>Lihat Foto</span>
									<Eye size={16} className='text-ink-primary' />
								</Link>
							)}
						</div>
					</div>
					<div className='flex justify-end items-end'>
						<div className='flex justify-end flex-col items-end'>
							<p className='text-ink-primary/50 leading-none text-right mb-0.5'>
								Dibuat oleh
							</p>
							<div className='flex gap-2 items-center'>
								<PhotoUrl
									url={data.user.photoUrl || ''}
									style={{ img: 'h-10 w-10' }}
								/>
								<div>
									<p className='text-ink-primary font-medium'>
										{data.user.username}
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	)
}

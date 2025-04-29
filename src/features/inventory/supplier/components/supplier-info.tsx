import { CalendarDays, ExternalLink } from 'lucide-react'
import { id as ind } from 'date-fns/locale'
import { format } from 'date-fns'

import { LoaderWrapper } from '@/shared/components/common/loader-wrapper'
import PhotoUrl from '@/shared/components/common/photo-url'
import { Card } from '@/shared/components/ui/card'

import { useSupplier } from '../api/use-supplier'
import { Link } from 'react-router-dom'

export default function SupplierInfo({ id }: { id?: string }) {
	const { data, isPending } = useSupplier({ id })

	return (
		<Card className='p-6 grid grid-cols-1 md:grid-cols-[120px_1fr] gap-4 relative'>
			<div className='w-full h-auto'>
				<PhotoUrl url={data?.data?.photoUrl as string} />
			</div>
			<div className='flex flex-col items-start gap-2 justify-center'>
				<p className='text-xl font-medium text-ink-primary'>
					{data?.data?.name}
				</p>
				<div className='flex gap-2 items-center'>
					<CalendarDays size={16} className='text-ink-light' />
					<LoaderWrapper isLoading={isPending}>
						{data?.data?.createdAt && (
							<p className='text-ink-light'>
								{format(new Date(data?.data?.createdAt as string), 'PPP', {
									locale: ind,
								})}
							</p>
						)}
					</LoaderWrapper>
				</div>
				<div>
					<p className='text-ink-light'>Alamat</p>
					<p className='text-ink-secondary'>{data?.data?.address ?? '-'}</p>
					{data?.data?.googleMapUrl && (
						<Link
							to={data.data.googleMapUrl}
							target='_blank'
							className='text-sm mt-2 flex items-center gap-2'
						>
							Lihat google map
							<ExternalLink size={16} />
						</Link>
					)}
				</div>
			</div>
		</Card>
	)
}

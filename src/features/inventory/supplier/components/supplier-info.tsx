import { CalendarDays, Store } from 'lucide-react'
import { id as ind } from 'date-fns/locale'
import { format } from 'date-fns'

import { LoaderWrapper } from '@/shared/components/common/loader-wrapper'
import PhotoUrl from '@/shared/components/common/photo-url'
import CardV1 from '@/shared/components/common/card-v1'

import ModalDetailSupplier from './modal-detail-supplier'
import { useSupplier } from '../api/use-supplier'

export default function SupplierInfo({ id }: { id?: string }) {
	const { data, isPending } = useSupplier({ id })

	return (
		<CardV1
			icon={<Store size={20} className='text-ink-primary' />}
			title='Supplier'
			style={{
				content: 'flex gap-4 items-center pt-4',
			}}
			action={<ModalDetailSupplier variant='info' />}
		>
			<PhotoUrl
				url={data?.data?.photoUrl as string}
				style={{ img: 'h-20 w-20' }}
			/>
			<div className='flex flex-col items-start gap-2 justify-center'>
				<p className='text-xl font-medium text-ink-primary'>
					{data?.data?.name}
				</p>
				<p className='text-sm text-ink-primary/50'>Dibuat sejak</p>
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
			</div>
		</CardV1>
	)
}

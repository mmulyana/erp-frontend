import { ExternalLink, List } from 'lucide-react'
import { Link } from 'react-router-dom'

import { LoaderWrapper } from '@/shared/components/common/loader-wrapper'
import CardV1 from '@/shared/components/common/card-v1'

import ModalDetailSupplier from './modal-detail-supplier'
import { useSupplier } from '../api/use-supplier'

export default function SupplierDetail({ id }: { id?: string }) {
	const { data, isPending } = useSupplier({ id })

	return (
		<CardV1
			title='Detail'
			icon={<List size={20} className='text-ink-primary' />}
			style={{ content: 'pt-4 flex flex-col gap-4' }}
			action={<ModalDetailSupplier variant='detail' />}
		>
			<div className='flex justify-between items-center'>
				<p className='text-ink-light'>
					Nomor Telepon <span className='opacity-50'>(Kantor)</span>
				</p>
				<LoaderWrapper isLoading={isPending}>
					<p className='text-ink-primary'>{data?.data?.phone}</p>
				</LoaderWrapper>
			</div>
			<div className='flex justify-between items-center'>
				<p className='text-ink-light'>Email</p>
				<LoaderWrapper isLoading={isPending}>
					<p className='text-ink-primary'>{data?.data?.email}</p>
				</LoaderWrapper>
			</div>
			<div className='flex items-start justify-between'>
				<p className='text-ink-light'>Alamat</p>
				<div className='flex flex-col gap-2 items-end'>
					<p className='text-ink-primary text-right max-w-[360px]'>
						{data?.data?.address ?? '-'}
					</p>
					{data?.data?.googleMapUrl && (
						<Link
							to={data.data.googleMapUrl}
							target='_blank'
							className='text-sm flex items-center gap-2 font-medium mt-2'
						>
							Lihat google map
							<ExternalLink size={16} />
						</Link>
					)}
				</div>
			</div>
		</CardV1>
	)
}

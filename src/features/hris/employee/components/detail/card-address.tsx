import { MapPin } from 'lucide-react'

import { LoaderWrapper } from '@/shared/components/common/loader-wrapper'
import CardV1 from '@/shared/components/common/card-v1'
import { formatPhone } from '@/shared/utils'

import { useDetailEmployee } from '../../hooks/use-detail-employee'
import ModalEditAddress from './modal-edit-address'

export default function CardAddress() {
	const { data, isPending } = useDetailEmployee()

	return (
		<CardV1
			title='Alamat dan kontak'
			icon={<MapPin size={20} className='text-ink-primary' />}
			style={{ content: 'space-y-6 pt-4' }}
			action={<ModalEditAddress />}
		>
			<div>
				<p className='text-ink-primary/50'>Alamat</p>
				<LoaderWrapper isLoading={isPending}>
					<p className='text-ink-primary'>{data?.address}</p>
				</LoaderWrapper>
			</div>
			<div>
				<p className='text-ink-primary/50'>Kontak</p>
				<LoaderWrapper isLoading={isPending}>
					{data?.phone && data.phone !== '' && (
						<p className='text-ink-primary'>{formatPhone(data?.phone)}</p>
					)}
				</LoaderWrapper>
			</div>
		</CardV1>
	)
}

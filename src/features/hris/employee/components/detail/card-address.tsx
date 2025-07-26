import { MapPin } from 'lucide-react'

import ProtectedComponent from '@/shared/components/common/protected'
import CardV1 from '@/shared/components/common/card-v1'
import { LoaderWrapper } from '@/shared/components/common/loader-wrapper'
import { permissions } from '@/shared/constants/permissions'
import { formatPhone } from '@/shared/utils'

import { useDetailEmployee } from '../../hooks/use-detail-employee'
import ModalEditEmployee from '../modal-edit-employee'

export default function CardAddress() {
	const { data, isPending } = useDetailEmployee()

	return (
		<CardV1
			title='Alamat dan kontak'
			icon={<MapPin size={20} className='text-ink-primary' />}
			style={{ content: 'space-y-6 pt-4' }}
			action={
				<ProtectedComponent required={[permissions.employee_update]}>
					<ModalEditEmployee variant='address' />
				</ProtectedComponent>
			}
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

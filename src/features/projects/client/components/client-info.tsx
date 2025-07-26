import { User } from 'lucide-react'

import CardV1 from '@/shared/components/common/card-v1'

import ModalDetailClient from './modal-detail-client'
import { useClient } from '../api/use-client'

export default function ClientInfo({ id }: { id?: string }) {
	const { data } = useClient({ id })
	return (
		<CardV1
			title='Informasi'
			icon={<User size={20} className='text-ink-primary' />}
			style={{ content: 'pt-4 space-y-6' }}
			action={<ModalDetailClient variant='info' />}
		>
			<div className='flex justify-between items-center'>
				<p className='text-ink-primary/50'>Nama</p>
				<p className='text-ink-primary'>{data?.data?.name}</p>
			</div>
			<div className='flex justify-between items-center'>
				<p className='text-ink-primary/50'>No Telp</p>
				<p className='text-ink-primary'>{data?.data?.phone}</p>
			</div>
			<div className='flex justify-between items-center'>
				<p className='text-ink-primary/50'>Email</p>
				<p className='text-ink-primary'>{data?.data?.email}</p>
			</div>
			<div className='flex justify-between items-center'>
				<p className='text-ink-primary/50'>Jabatan</p>
				<p className='text-ink-primary'>{data?.data?.position}</p>
			</div>
		</CardV1>
	)
}

import { List } from 'lucide-react'

import ProgressPercentage from '@/shared/components/common/progress-percentage'
import StatusBadge from '@/shared/components/common/status-badge'
import PhotoUrl from '@/shared/components/common/photo-url'
import CardV1 from '@/shared/components/common/card-v1'
import { LoaderWrapper } from '@/shared/components/common/loader-wrapper'
import { formatThousands } from '@/shared/utils'

import { statusBadges } from '../constant/types'
import { useProject } from '../api/use-project'
import ModalEditProject from './modal-edit-project'
import Priority from './priority'

export default function ProjectDetail({ id }: { id?: string }) {
	const { data, isPending } = useProject({ id })

	return (
		<CardV1
			title='Detail'
			icon={<List size={20} className='text-ink-primary' />}
			style={{ content: 'space-y-4 pt-4', card: 'relative' }}
			action={<ModalEditProject variant='detail' />}
		>
			<div className='flex justify-between items-center'>
				<p className='text-ink-light'>Nilai Proyek</p>
				<LoaderWrapper isLoading={isPending}>
					<p>Rp {formatThousands(data?.data?.netValue)}</p>
				</LoaderWrapper>
			</div>
			<div className='flex justify-between items-center'>
				<p className='text-ink-light'>Progress</p>
				<LoaderWrapper isLoading={isPending}>
					<ProgressPercentage
						percentage={data?.data?.progressPercentage || 0}
					/>
				</LoaderWrapper>
			</div>
			<div className='flex justify-between items-center'>
				<p className='text-ink-light'>Progress Pembayaran</p>
				<LoaderWrapper isLoading={isPending}>
					<ProgressPercentage percentage={data?.data?.paymentPercentage || 0} />
				</LoaderWrapper>
			</div>
			<div className='flex justify-between items-center'>
				<p className='text-ink-light'>Prioritas</p>
				<Priority value={data?.data?.priority as string} />
			</div>
			<div className='flex justify-between items-center'>
				<p className='text-ink-light'>Prioritas</p>
				<StatusBadge value={data?.data?.status} options={statusBadges} />
			</div>
			<div className='flex justify-between items-center'>
				<p className='text-ink-light'>Klien</p>
				<LoaderWrapper isLoading={isPending}>
					<p className='text-ink-primary'>{data?.data?.client?.name}</p>
				</LoaderWrapper>
			</div>
			<div className='flex justify-between items-center'>
				<p className='text-ink-light'>Penanggung Jawab</p>
				{data?.data?.lead && (
					<div className='flex gap-2 items-center'>
						<PhotoUrl
							url={data?.data?.lead?.photoUrl || ''}
							style={{ img: 'h-8 w-8', icon: 'h-5 w-5' }}
						/>
						<p className='text-ink-primary'>{data?.data?.lead?.username}</p>
					</div>
				)}
			</div>
		</CardV1>
	)
}

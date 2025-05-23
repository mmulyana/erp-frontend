import { ExternalLink, List } from 'lucide-react'
import { Link } from 'react-router-dom'

import StatusBadge from '@/shared/components/common/status-badge'
import CardV1 from '@/shared/components/common/card-v1'
import { paths } from '@/shared/constants/paths'

import ModalEditItem from './modal-edit-item'
import { useItem } from '../api/use-item'
import { statusItem } from '../constant'

type props = {
	id?: string
}
export default function ItemDetail({ id }: props) {
	const { data } = useItem({ id })
	return (
		<CardV1
			title='Detail'
			icon={<List size={20} className='text-ink-primary' />}
			style={{ content: 'space-y-4 pt-4', card: 'relative' }}
			action={<ModalEditItem variant='detail' />}
		>
			<div className='flex justify-between items-center'>
				<p className='text-ink-primary/50'>Status</p>
				<StatusBadge value={data?.data?.status} options={statusItem} />
			</div>
			<div className='flex justify-between items-center'>
				<p className='text-ink-primary/50'>Kategori</p>
				<p className='text-ink-primary'>{data?.data?.category}</p>
			</div>
			<div className='flex justify-between items-center'>
				<p className='text-ink-primary/50'>Minimum</p>
				<p className='text-ink-primary'>{data?.data?.minimum}</p>
			</div>
			<div className='flex justify-between items-center'>
				<p className='text-ink-primary/50'>Satuan pengukuran</p>
				<p className='text-ink-primary'>{data?.data?.unitOfMeasurement}</p>
			</div>
			<div className='flex justify-between items-center'>
				<p className='text-ink-primary/50'>Lokasi</p>
				<div className='flex gap-1 items-center'>
					<p className='text-ink-primary'>{data?.data?.warehouse?.name}</p>
					<Link
						to={`${paths.inventoryMasterdataLocation}/${data?.data?.warehouseId}`}
						className='flex gap-1 items-center'
					>
						<span className='px-0.5'>Lihat</span>
						<ExternalLink size={16} />
					</Link>
				</div>
			</div>
			<div className='flex justify-between items-center'>
				<p className='text-ink-primary/50'>Merek</p>
				<div className='flex gap-2 items-center'>
					<p className='text-ink-primary'>{data?.data?.brand?.name}</p>
					<Link
						to={`${paths.inventoryMasterdataBrand}/${data?.data?.brandId}`}
						className='flex gap-1 items-center'
					>
						<span className='px-0.5'>Lihat</span>
						<ExternalLink size={16} />
					</Link>
				</div>
			</div>
		</CardV1>
	)
}

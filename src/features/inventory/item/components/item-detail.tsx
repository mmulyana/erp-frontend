import { Card } from '@/shared/components/ui/card'
import { useItem } from '../api/use-item'
import { Link } from 'react-router-dom'
import { paths } from '@/shared/constants/paths'

type props = {
	id?: string
}
export default function ItemDetail({ id }: props) {
	const { data } = useItem({ id })

	return (
		<Card className='p-6 flex flex-col gap-4'>
			<p className='font-medium text-ink-secondary'>Detail</p>
			<div className='flex justify-between items-center'>
				<p className='text-ink-light'>Kategori</p>
				<p className='text-ink-secondary'>{data?.data?.category}</p>
			</div>
			<div className='flex justify-between items-center'>
				<p className='text-ink-light'>Satuan pengukuran</p>
				<p className='text-ink-secondary'>{data?.data?.unitOfMeasurement}</p>
			</div>
			<div className='flex justify-between items-center'>
				<p className='text-ink-light'>Lokasi</p>
				<div className='flex gap-1 items-center'>
					<p className='text-ink-secondary'>{data?.data?.location.name}</p>
					<Link to={`${paths.inventoryMasterdataLocation}/${id}`}>Lihat</Link>
				</div>
			</div>
			<div className='flex justify-between items-center'>
				<p className='text-ink-light'>Merek</p>
				<div className='flex gap-1 items-center'>
					<p className='text-ink-secondary'>{data?.data?.brand.name}</p>
					<Link to={`${paths.inventoryMasterdataBrand}/${id}`}>Lihat</Link>
				</div>
			</div>
			<div className='flex justify-between items-center'>
				<p className='text-ink-light'>Dibuat oleh</p>
				<p className='text-ink-secondary'>{data?.data?.user?.username}</p>
			</div>
		</Card>
	)
}

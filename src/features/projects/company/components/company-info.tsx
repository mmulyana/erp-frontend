import CardV1 from '@/shared/components/common/card-v1'
import { useCompany } from '../api/use-company'
import { Building } from 'lucide-react'

export default function CompanyInfo({
	id,
	action,
}: {
	id?: string
	action?: React.ReactNode
}) {
	const { data } = useCompany({ id })

	return (
		<CardV1
			title='Perusahaan'
			icon={<Building size={20} className='text-ink-primary' />}
			style={{ content: 'pt-4 space-y-6' }}
			action={action}
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
				<p className='text-ink-primary/50'>Alamat</p>
				<p className='text-ink-primary text-right max-w-[120px]'>
					{data?.data?.address}
				</p>
			</div>
		</CardV1>
	)
}

import { Pencil } from 'lucide-react'

import ProgressPercentage from '@/shared/components/common/progress-percentage'
import { LoaderWrapper } from '@/shared/components/common/loader-wrapper'
import { Button } from '@/shared/components/ui/button'
import { Badge } from '@/shared/components/ui/badge'
import { Card } from '@/shared/components/ui/card'

import { useProject } from '../api/use-project'

export default function ProjectDetail({ id }: { id?: string }) {
	const { data, isPending } = useProject({ id })

	return (
		<Card className='p-6 h-auto flex flex-col gap-4'>
			<div className='flex justify-between items-center'>
				<p className='text-ink-primary'>Detail</p>
				<Button variant='outline' className='gap-2'>
					<Pencil size={16} />
					<span className='px-0.5'>Edit</span>
				</Button>
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
				<Badge variant='outline' className='border-gray-200 gap-0.5 px-1.5'>
					<div className='px-0.5'>
						<p className='text-ink-secondary'>Rendah</p>
					</div>
				</Badge>
			</div>
			<div className='flex justify-between items-center'>
				<p className='text-ink-light'>Klien</p>
				<LoaderWrapper isLoading={isPending}>
					<p className='text-ink-secondary'>{data?.data?.client?.name}</p>
				</LoaderWrapper>
			</div>
			<div className='flex justify-between items-center'>
				<p className='text-ink-light'>Penanggung Jawab</p>
				<div className='flex gap-2 items-center'>
					<div className='h-6 w-6 rounded-full bg-gray-200'></div>
					<p className='text-ink-secondary'>Ahmad</p>
				</div>
			</div>
			<div className='flex justify-between items-center'>
				<p className='text-ink-light'>Purchase order</p>
				<div className='flex gap-2 items-center'>
					<p className='text-ink-secondary'>#1234</p>
					<p className='text-brand'>Lihat</p>
				</div>
			</div>
			<div className='flex justify-between items-center'>
				<p className='text-ink-light'>Berita acara</p>
				<div className='flex gap-2 items-center'>
					<p className='text-ink-secondary'>#1234</p>
					<p className='text-brand'>Lihat</p>
				</div>
			</div>
		</Card>
	)
}

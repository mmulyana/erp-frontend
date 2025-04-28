import { Badge } from '@/shared/components/ui/badge'
import { Card } from '@/shared/components/ui/card'

export default function ProjectDetail({ id }: { id?: string }) {
	return (
		<Card className='p-6 h-auto flex flex-col gap-4'>
			<p className='text-ink-primary'>Detail</p>
			<div className='flex justify-between items-center'>
				<p className='text-ink-light'>Progress</p>
				<div className='flex gap-2 items-center'>
					<div className='relative bg-gray-200/50 rounded-full w-[120px] h-2'>
						<div className='absolute left-0 top-0 h-2 w-20 bg-brand rounded-full'></div>
					</div>
					<p className='text-ink-secondary'>18%</p>
				</div>
			</div>
			<div className='flex justify-between items-center'>
				<p className='text-ink-light'>Progress Pembayaran</p>
				<div className='flex gap-2 items-center'>
					<div className='relative bg-gray-200/50 rounded-full w-[120px] h-2'>
						<div className='absolute left-0 top-0 h-2 w-20 bg-brand rounded-full'></div>
					</div>
					<p className='text-ink-secondary'>18%</p>
				</div>
			</div>
			<div className='flex justify-between items-center'>
				<p className='text-ink-light'>Prioritas</p>
				<Badge variant='outline' className='border-gray-200 gap-0.5 px-1.5'>
					<div className='h-1.5 w-1.5 rounded-sm bg-ink-light'></div>
					<div className='px-0.5'>
						<p className='text-ink-secondary'>Rendah</p>
					</div>
				</Badge>
			</div>
			<div className='flex justify-between items-center'>
				<p className='text-ink-light'>Klien</p>
				<p className='text-ink-secondary'>Bambang</p>
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

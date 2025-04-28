import { CalendarDays, Pencil } from 'lucide-react'
import { id as ind } from 'date-fns/locale'
import { format } from 'date-fns'

import { LoaderWrapper } from '@/shared/components/common/loader-wrapper'
import PhotoUrl from '@/shared/components/common/photo-url'
import { Button } from '@/shared/components/ui/button'
import { Card } from '@/shared/components/ui/card'

import { useItem } from '../api/use-item'

type props = {
	id?: string
}
export default function ItemInfo({ id }: props) {
	const { data, isPending } = useItem({ id })

	return (
		<Card className='p-6 grid grid-cols-1 md:grid-cols-[120px_1fr] gap-4 relative'>
			<div className='w-full h-auto'>
				<PhotoUrl url={data?.data?.photoUrl as string} />
			</div>
			<div className='flex flex-col items-start gap-2 justify-center'>
				<p className='text-xl font-medium text-ink-primary'>
					{data?.data?.name}
				</p>
				<div className='flex gap-2 items-center'>
					<CalendarDays size={16} className='text-ink-light' />
					<LoaderWrapper isLoading={isPending}>
						<p>
							{format(new Date(data?.data?.createdAt as string), 'PPP', {
								locale: ind,
							})}
						</p>
					</LoaderWrapper>
				</div>
				<div>
					<p className='text-ink-light'>Deskripsi</p>
					<p>{data?.data?.description}</p>
				</div>
			</div>

			<Button variant='outline' className='gap-2 absolute top-6 right-6'>
				<Pencil size={16} />
				<span className='px-0.5'>Edit</span>
			</Button>
		</Card>
	)
}

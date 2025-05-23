import { CalendarDays, Pencil } from 'lucide-react'
import { id as ind } from 'date-fns/locale'
import { format } from 'date-fns'

import { LoaderWrapper } from '@/shared/components/common/loader-wrapper'
import PhotoUrl from '@/shared/components/common/photo-url'
import { Button } from '@/shared/components/ui/button'
import { Card } from '@/shared/components/ui/card'

import { useItem } from '../api/use-item'
import CardV1 from '@/shared/components/common/card-v1'
import ModalEditItem from './modal-edit-item'

type props = {
	id?: string
}
export default function ItemInfo({ id }: props) {
	const { data, isPending } = useItem({ id })

	return (
		<CardV1
			action={<ModalEditItem variant='info' />}
			style={{
				card: 'relative',
			}}
		>
			<div className='grid grid-cols-1 md:grid-cols-[120px_1fr] gap-2'>
				<PhotoUrl
					url={data?.data?.photoUrl as string}
					style={{
						img: 'w-[104px] h-[104px] border border-dashed border-line bg-gray-50',
						icon: 'w-8 h-8',
					}}
				/>
				<div className='flex flex-col items-start gap-2 justify-center'>
					<p className='text-2xl font-medium text-ink-primary'>
						{data?.data?.name}
					</p>
					<div className='flex gap-2 items-center'>
						<CalendarDays size={16} className='text-ink-light' />
						<LoaderWrapper isLoading={isPending}>
							{data?.data?.createdAt && (
								<p>
									{format(new Date(data?.data?.createdAt as string), 'PPP', {
										locale: ind,
									})}
								</p>
							)}
						</LoaderWrapper>
					</div>
					{data?.data?.description && data?.data?.description !== '<p></p>' && (
						<div className='mt-4'>
							<p className='text-ink-light text-sm'>Deskripsi</p>
							<div
								className='w-full py-2 prose prose-li:leading-none'
								dangerouslySetInnerHTML={{ __html: data?.data?.description }}
							/>
						</div>
					)}
				</div>
			</div>
		</CardV1>
	)
}

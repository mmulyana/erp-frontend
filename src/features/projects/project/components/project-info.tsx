import { CalendarDays, Clock, Pencil } from 'lucide-react'
import { differenceInDays, format } from 'date-fns'
import { id as ind } from 'date-fns/locale'

import { LoaderWrapper } from '@/shared/components/common/loader-wrapper'
import CardV1 from '@/shared/components/common/card-v1'
import { Badge } from '@/shared/components/ui/badge'

import { useProject } from '../api/use-project'
import ModalEditProject from './modal-edit-project'

export default function ProjectInfo({ id }: { id?: string }) {
	const { data, isPending } = useProject({ id })

	const timeLeft =
		(data?.data?.deadlineAt &&
			differenceInDays(new Date(), new Date(data.data.deadlineAt))) ||
		0
	return (
		<>
			<CardV1
				style={{ content: 'space-y-4 relative', card: 'relative' }}
				action={<ModalEditProject variant='info' />}
			>
				<div className='flex justify-between items-start'>
					<LoaderWrapper isLoading={isPending}>
						<p className='text-ink-primary text-xl font-medium'>
							{data?.data?.name}
						</p>
					</LoaderWrapper>
				</div>
				<div className='flex flex-wrap gap-4 mt-6'>
					<LoaderWrapper isLoading={isPending}>
						{data?.data?.createdAt && (
							<div className='flex gap-2 items-center flex-wrap'>
								<CalendarDays size={16} className='text-ink-light' />
								<p className='text-ink-secondary'>
									{format(new Date(data?.data?.createdAt), 'PPP', {
										locale: ind,
									})}
								</p>
								<Badge
									variant='secondary'
									className='text-xs text-ink-secondary'
								>
									{differenceInDays(new Date(data.data.createdAt), new Date())}{' '}
									hari terlewat
								</Badge>
							</div>
						)}
					</LoaderWrapper>
					<LoaderWrapper isLoading={isPending}>
						{data?.data?.deadlineAt && (
							<div className='flex gap-2 items-center flex-wrap'>
								<Clock size={16} className='text-ink-light' />
								<p className='text-ink-secondary'>
									{format(new Date(data?.data?.deadlineAt), 'PPP', {
										locale: ind,
									})}
								</p>
								<Badge
									variant='secondary'
									className='text-xs text-ink-secondary'
								>
									{timeLeft < 0 ? (timeLeft - 1) * -1 : timeLeft + 1}{' '}
									{timeLeft < 0 ? 'hari lagi' : 'hari terlewat'}
								</Badge>
							</div>
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
			</CardV1>
		</>
	)
}

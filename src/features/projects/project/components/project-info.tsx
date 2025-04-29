import { CalendarDays, Clock, Pencil } from 'lucide-react'
import { differenceInDays, format } from 'date-fns'
import { id as ind } from 'date-fns/locale'

import { LoaderWrapper } from '@/shared/components/common/loader-wrapper'
import { Button } from '@/shared/components/ui/button'
import { Badge } from '@/shared/components/ui/badge'
import { Card } from '@/shared/components/ui/card'

import { useProject } from '../api/use-project'

export default function ProjectInfo({ id }: { id?: string }) {
	const { data, isPending } = useProject({ id })

	return (
		<Card className='p-6 pt-5 h-fit'>
			<div className='flex justify-between items-start'>
				<LoaderWrapper isLoading={isPending}>
					<p className='text-ink-primary text-xl font-medium'>
						{data?.data?.name}
					</p>
				</LoaderWrapper>
				<Button variant='outline' className='gap-2'>
					<Pencil size={16} />
					<span className='px-0.5'>Edit</span>
				</Button>
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
							<Badge variant='secondary' className='text-xs text-ink-secondary'>
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
							<Badge variant='secondary' className='text-xs text-ink-secondary'>
								{differenceInDays(new Date(), new Date(data.data.deadlineAt))}{' '}
								hari terlewat
							</Badge>
						</div>
					)}
				</LoaderWrapper>
			</div>
			<div className='mt-4'>
				<p className='text-ink-light text-sm'>Deskripsi</p>
				<LoaderWrapper isLoading={isPending}>
					{data?.data?.description && (
						<div
							className='w-full py-2 prose prose-li:leading-none'
							dangerouslySetInnerHTML={{ __html: data?.data?.description }}
						/>
					)}
				</LoaderWrapper>
			</div>
		</Card>
	)
}

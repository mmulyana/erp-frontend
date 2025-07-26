import { differenceInDays, format } from 'date-fns'
import { CalendarCheck, CalendarDays, Clock } from 'lucide-react'
import { id as ind } from 'date-fns/locale'

import { LoaderWrapper } from '@/shared/components/common/loader-wrapper'
import CardV1 from '@/shared/components/common/card-v1'
import { Badge } from '@/shared/components/ui/badge'

import ModalEditProject from './modal-edit-project'
import { useProject } from '../api/use-project'
import ProtectedComponent from '@/shared/components/common/protected'
import { permissions } from '@/shared/constants/permissions'

export default function ProjectInfo({ id }: { id?: string }) {
	const { data, isPending } = useProject({ id })
	const project = data?.data

	const deadlineAt = project?.deadlineAt ? new Date(project.deadlineAt) : null
	const doneAt = project?.doneAt ? new Date(project.doneAt) : null
	const createdAt = project?.createdAt ? new Date(project.createdAt) : null

	const today = new Date()
	const timeLeft = deadlineAt ? differenceInDays(deadlineAt, today) : null
	const timeSinceCreated = createdAt ? differenceInDays(today, createdAt) : null

	const renderBadge = (days: number, isFuture: boolean) => (
		<Badge variant='secondary' className='text-xs text-ink-secondary'>
			{Math.abs(days)} {isFuture ? 'hari lagi' : 'hari terlewat'}
		</Badge>
	)

	return (
		<CardV1
			style={{ content: 'space-y-4 relative', card: 'relative' }}
			action={
				<ProtectedComponent required={[permissions.project_update]}>
					<ModalEditProject variant='info' />
				</ProtectedComponent>
			}
		>
			<div className='flex justify-between items-start'>
				<LoaderWrapper isLoading={isPending}>
					<p className='text-ink-primary text-xl font-medium'>
						{project?.name}
					</p>
				</LoaderWrapper>
			</div>

			<div className='flex flex-wrap gap-4 mt-6'>
				<LoaderWrapper isLoading={isPending}>
					{createdAt && (
						<div className='flex gap-2 items-center flex-wrap'>
							<CalendarDays size={16} className='text-ink-light' />
							<p className='text-ink-secondary'>
								{format(createdAt, 'PPP', { locale: ind })}
							</p>
							{!doneAt && timeSinceCreated !== null &&
								renderBadge(timeSinceCreated, false)}
						</div>
					)}
				</LoaderWrapper>

				<LoaderWrapper isLoading={isPending}>
					{doneAt ? (
						<div className='flex gap-2 items-center flex-wrap'>
							<CalendarCheck size={16} className='text-ink-light' />
							<p className='text-ink-secondary'>
								{format(doneAt, 'PPP', { locale: ind })}
							</p>
						</div>
					) : deadlineAt ? (
						<div className='flex gap-2 items-center flex-wrap'>
							<Clock size={16} className='text-ink-light' />
							<p className='text-ink-secondary'>
								{format(deadlineAt, 'PPP', { locale: ind })}
							</p>
							{timeLeft !== null && renderBadge(timeLeft, timeLeft >= 0)}
						</div>
					) : null}
				</LoaderWrapper>
			</div>

			{project?.description && project.description !== '<p></p>' && (
				<div className='mt-4'>
					<p className='text-ink-light text-sm'>Deskripsi</p>
					<div
						className='w-full py-2 prose prose-li:leading-none'
						dangerouslySetInnerHTML={{ __html: project.description }}
					/>
				</div>
			)}
		</CardV1>
	)
}

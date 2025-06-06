import {
	Calendar,
	Image,
	MessageSquareMoreIcon,
	Pencil,
	Send,
	Trash,
	X,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { id as ind } from 'date-fns/locale'
import { useAtomValue } from 'jotai'
import { format } from 'date-fns'

import DropdownMenuV1 from '@/shared/components/common/dropdown-menu-v1'
import EmptyState from '@/shared/components/common/empty-state'
import PhotoUrl from '@/shared/components/common/photo-url'

import { ScrollArea } from '@/shared/components/ui/scroll-area'
import { Button } from '@/shared/components/ui/button'
import { Input } from '@/shared/components/ui/input'
import { userAtom } from '@/shared/store/auth'
import { socket } from '@/shared/utils/socket'
import { User } from '@/shared/types/api'
import { cn } from '@/shared/utils/cn'

import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from '@/shared/components/ui/avatar'

import { ModalEditReport } from './modal-edit-report'
import { useReport } from '../api/report/use-report'
import { warningTypes } from '../constant/types'
import { DropdownMenuItem } from '@/shared/components/ui/dropdown-menu'
import { baseUrl } from '@/shared/constants/urls'

type Comment = {
	id: string
	message: string
	createdBy: string
	commentId?: string | null
	reportId: string
	createdAt: string
	updatedAt: string
	deletedAt?: string | null
	user: User
}

export default function ReportComment({ id }: { id?: string }) {
	const user = useAtomValue(userAtom)

	const { data } = useReport({ id })
	const imagesLength = data?.data?.attachments.length || 0

	const [comments, setComments] = useState<Comment[]>([])
	const [newComment, setNewComment] = useState('')
	const [replyTo, setReplyTo] = useState<Comment | null>(null)
	const [inlineReplies, setInlineReplies] = useState<Record<string, string>>({})
	const [editingCommentId, setEditingCommentId] = useState<string | null>(null)

	useEffect(() => {
		if (!id) return

		socket.emit('report-comment:join', id)
		socket.emit('report-comment:findAll', id)

		const handleAll = (data: Comment[]) => setComments(data)
		const handleCreated = (comment: Comment) =>
			setComments((prev) => [...prev, comment])
		const handleUpdated = (comment: Comment) =>
			setComments((prev) =>
				prev.map((c) => (c.id === comment.id ? comment : c))
			)
		const handleDeleted = (deletedId: string) =>
			setComments((prev) =>
				prev.map((c) =>
					c.id === deletedId ? { ...c, deletedAt: new Date().toISOString() } : c
				)
			)

		socket.on('report-comment:all', handleAll)
		socket.on('report-comment:created', handleCreated)
		socket.on('report-comment:updated', handleUpdated)
		socket.on('report-comment:deleted', handleDeleted)

		return () => {
			socket.off('report-comment:all', handleAll)
			socket.off('report-comment:created', handleCreated)
			socket.off('report-comment:updated', handleUpdated)
			socket.off('report-comment:deleted', handleDeleted)
		}
	}, [id])

	const handleAddComment = () => {
		if (!newComment.trim() || !id) return

		if (editingCommentId) {
			socket.emit('report-comment:update', {
				id: editingCommentId,
				message: newComment,
			})
			setEditingCommentId(null)
			setNewComment('')
			return
		}

		socket.emit('report-comment:create', {
			message: newComment,
			reportId: id,
			commentId: replyTo?.id || null,
			createdBy: user?.id,
		})

		setNewComment('')
		setReplyTo(null)
	}

	const handleInlineReply = (commentId: string, message: string) => {
		if (!message.trim() || !id) return

		socket.emit('report-comment:create', {
			message,
			reportId: id,
			commentId,
			createdBy: user?.id,
		})

		setInlineReplies((prev) => ({ ...prev, [commentId]: '' }))
	}

	const handleEditComment = (id: string, message: string) => {
		setEditingCommentId(id)
		setNewComment(message)
		setReplyTo(null)
	}

	const handleDeleteComment = (id: string) => {
		socket.emit('report-comment:delete', id)
	}

	const renderComments = (parentId: string | null = null, depth = 0) => {
		if (!comments.length) return <EmptyState className='h-[400px]' />

		return comments
			.filter((c) => c.commentId === parentId)
			.map((comment) => (
				<div
					key={comment.id}
					className={cn('space-y-2 mt-4', depth > 0 && 'pl-8')}
				>
					<div className='flex gap-3 relative'>
						<Avatar className='h-8 w-8'>
							<AvatarImage src={baseUrl + '/' + comment.user.photoUrl} />
							<AvatarFallback className='uppercase'>
								{comment.user.username[0]}
							</AvatarFallback>
						</Avatar>
						<div className='flex-1 space-y-1'>
							<div className='flex justify-between items-center'>
								<div className='flex items-center gap-2'>
									<p className='font-medium text-ink-primary'>
										{comment.user.username}
									</p>
									<p className='text-ink-primary/80'>
										{new Date(comment.createdAt).toLocaleTimeString()}
									</p>
								</div>
								{comment.createdBy === user?.id && !comment.deletedAt && (
									<DropdownMenuV1
										style={{
											trigger: 'p-0 h-6 w-6 bg-transparent',
										}}
									>
										<DropdownMenuItem
											onClick={() =>
												handleEditComment(comment.id, comment.message)
											}
										>
											<Pencil className='mr-2 h-4 w-4' />
											Edit
										</DropdownMenuItem>
										<DropdownMenuItem
											onClick={() => handleDeleteComment(comment.id)}
										>
											<Trash className='mr-2 h-4 w-4' />
											Delete
										</DropdownMenuItem>
									</DropdownMenuV1>
								)}
							</div>
							<p
								className={cn(
									'text-ink-primary',
									comment.deletedAt && 'text-ink-primary/30 line-through'
								)}
							>
								{comment.deletedAt ? 'Komentar dihapus' : comment.message}
							</p>
							{!comment.deletedAt && depth < 2 && (
								<Button
									variant='link'
									className='text-sm !no-underline text-brand p-0'
									onClick={() => {
										setReplyTo(comment)
										setEditingCommentId(null)
										setNewComment('')
									}}
								>
									Balas
								</Button>
							)}
						</div>
					</div>

					<div>{renderComments(comment.id, depth + 1)}</div>

					{depth < 2 && comments.some((c) => c.commentId === comment.id) && (
						<div
							className={cn(
								'pl-8 flex items-start gap-2',
								depth == 1 && 'pb-4'
							)}
						>
							<Avatar className='h-8 w-8'>
								<AvatarImage src={baseUrl + '/' + user?.photoUrl || ''} />
								<AvatarFallback className='uppercase font-medium'>
									{user?.username.at(1)}
								</AvatarFallback>
							</Avatar>
							<div className='flex-1 flex gap-2'>
								<Input
									value={inlineReplies[comment.id] || ''}
									className='h-10'
									onChange={(e) =>
										setInlineReplies((prev) => ({
											...prev,
											[comment.id]: e.target.value,
										}))
									}
									onKeyDown={(e) => {
										if (e.key === 'Enter' && !e.shiftKey) {
											e.preventDefault()
											handleInlineReply(comment.id, inlineReplies[comment.id])
										}
									}}
								/>
								<Button
									className='h-10 w-12'
									onClick={() =>
										handleInlineReply(comment.id, inlineReplies[comment.id])
									}
									disabled={!inlineReplies[comment.id]?.trim()}
								>
									<Send className='h-4 w-4' />
								</Button>
							</div>
						</div>
					)}
				</div>
			))
	}

	const isWarning = warningTypes.includes(data?.data?.type || '')

	return (
		<div
			className={cn(
				'bg-white flex flex-col h-[calc(100svh-370px)] md:h-full relative',
				imagesLength ? 'w-full md:w-[480px]' : 'w-full'
			)}
		>
			<div className='p-4 border-b'>
				<div className='grid grid-cols-[40px_1fr] gap-4'>
					<PhotoUrl
						url={data?.data?.user.photoUrl || ''}
						style={{ img: 'w-10 h-10' }}
					/>
					<div>
						<div className='flex flex-wrap gap-4 items-center mb-2'>
							<p className='text-ink-primary font-medium lowercase'>
								{data?.data?.user.username}{' '}
								<span className='opacity-50 font-normal'>
									{isWarning ? 'Melaporkan' : 'Menambahkan laporan'}{' '}
								</span>
								{data?.data?.type}
							</p>
						</div>
						<p className='text-ink-primary'>{data?.data?.message}</p>
					</div>
				</div>
				<div className='absolute top-4 right-4'>
					{user.id === data?.data?.createdBy && (
						<DropdownMenuV1 style={{ content: 'min-w-[96px]' }}>
							<ModalEditReport
								reportId={id}
								defaultValues={{
									attachments: data?.data?.attachments || [],
									message: data?.data?.message || '',
									type: data?.data?.type || '',
								}}
							/>
						</DropdownMenuV1>
					)}
				</div>
				<div className='flex gap-4 items-center pl-14 pt-4'>
					<div className='flex gap-2 items-center'>
						<MessageSquareMoreIcon size={20} className='text-[#959597]' />
						<p className='text-[#959597]'>{comments?.length}</p>
					</div>
					<div className='flex gap-2 items-center'>
						<Image size={20} className='text-[#959597]' />
						<p className='text-[#959597]'>{data?.data?._count.attachments}</p>
					</div>
					<div className='flex gap-2 items-center ml-0 md:ml-auto'>
						<Calendar size={20} className='text-[#959597]' />
						{data?.data?.createdAt && (
							<p className='text-[#959597]'>
								{format(new Date(data?.data?.createdAt), 'PPP', {
									locale: ind,
								})}
							</p>
						)}
					</div>
				</div>
			</div>

			<ScrollArea className='h-full px-4 pb-[72px] bg-gray-50'>
				<div className='space-y-4'>{renderComments(null)}</div>
			</ScrollArea>

			<div className='p-4 border-t space-y-2 absolute left-0 bottom-0 w-full bg-white'>
				{(replyTo || editingCommentId) && (
					<div className='flex items-center justify-between bg-muted px-3 py-2 rounded'>
						<span className='text-sm text-muted-foreground truncate'>
							{editingCommentId
								? 'Editing comment...'
								: `Replying to: ${replyTo?.message}`}
						</span>
						<button
							onClick={() => {
								setReplyTo(null)
								setEditingCommentId(null)
								setNewComment('')
							}}
						>
							<X className='h-4 w-4 text-muted-foreground' />
						</button>
					</div>
				)}
				<div className='flex gap-2'>
					<Avatar className='h-10 w-10'>
						<AvatarImage src={baseUrl + '/' + user?.photoUrl || ''} />
						<AvatarFallback className='uppercase font-medium'>
							{user?.username.at(1)}
						</AvatarFallback>
					</Avatar>
					<div className='flex-1 flex gap-2'>
						<Input
							placeholder='Tambahkan komentar'
							value={newComment}
							onChange={(e) => setNewComment(e.target.value)}
							onKeyDown={(e) => {
								if (e.key === 'Enter' && !e.shiftKey) {
									e.preventDefault()
									handleAddComment()
								}
							}}
						/>
						<Button
							className='h-full w-12'
							onClick={() => handleAddComment()}
							disabled={!newComment.trim()}
						>
							{editingCommentId ? 'Save' : <Send className='h-4 w-4' />}
						</Button>
					</div>
				</div>
			</div>
		</div>
	)
}

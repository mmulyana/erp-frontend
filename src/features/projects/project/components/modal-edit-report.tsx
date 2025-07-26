import { useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Pencil } from 'lucide-react'

import { Button } from '@/shared/components/ui/button'
import { keys } from '@/shared/constants/keys'
import {
	Dialog,
	DialogTrigger,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
} from '@/shared/components/ui/dialog'

import { useUpdateReport } from '../api/report/use-update-report'
import { FormReport } from './form-report'

type FormValues = {
	message: string
	type: string
	date?: Date
	attachments?: File[]
}

type Props = {
	reportId?: string
	defaultValues: {
		message: string
		type: string
		attachments: { id: string; photoUrl: string }[]
	}
}

export function ModalEditReport({ reportId, defaultValues }: Props) {
	const queryClient = useQueryClient()

	const [deletedAttachments, setDeletedAttachments] = useState<string[]>([])
	const [attachments, setAttachments] = useState<any[]>([])
	const [open, setOpen] = useState(false)

	const form = useForm<FormValues>({
		defaultValues: {
			message: defaultValues.message,
			type: defaultValues.type,
		},
	})

	const { mutate: updateReport, isPending } = useUpdateReport()

	const onSubmit = (data: FormValues) => {
		if (!reportId) return

		updateReport(
			{
				id: reportId,
				...data,
				deleteAttachments: deletedAttachments,
			},
			{
				onSuccess: () => {
					setDeletedAttachments([])
					form.reset()
					setOpen(false)

					queryClient.invalidateQueries({
						queryKey: [keys.reportDetail, reportId],
					})
				},
			}
		)
	}

	useEffect(() => {
		if (open) {
			form.reset({
				message: defaultValues.message,
				type: defaultValues.type,
			})
			setAttachments(defaultValues.attachments)
		}
	}, [open, defaultValues, form])

	return (
		<Dialog onOpenChange={setOpen} open={open}>
			<DialogTrigger asChild>
				<Button variant='ghost' className='cursor-pointer w-full justify-start'>
					<Pencil className='mr-2 h-4 w-4' />
					Edit
				</Button>
			</DialogTrigger>
			<DialogContent className='max-w-lg px-6'>
				<DialogHeader>
					<DialogTitle className='text-center'>Edit Laporan</DialogTitle>
					<DialogDescription className='text-center'>
						Kamu bisa mengubah isi pesan, tipe laporan, atau gambar terlampir.
					</DialogDescription>
				</DialogHeader>

				<FormReport
					form={form}
					onSubmit={onSubmit}
					isPending={isPending}
					attachments={attachments.filter(
						(i) => !deletedAttachments.includes(i.id)
					)}
					onDeleteAttachment={(id) =>
						setDeletedAttachments((prev) => [...prev, id])
					}
				/>
			</DialogContent>
		</Dialog>
	)
}

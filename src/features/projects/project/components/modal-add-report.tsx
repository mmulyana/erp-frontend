import { useForm } from 'react-hook-form'
import { Plus } from 'lucide-react'
import { useState } from 'react'

import { Button } from '@/shared/components/ui/button'
import {
	Dialog,
	DialogTrigger,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
} from '@/shared/components/ui/dialog'

import { useCreateReport } from '../api/report/use-create-report'
import { FormReport } from './form-report'

type FormValues = {
	message: string
	type: string
	date?: Date
}

export function ModalAddReport({ projectId }: { projectId?: string }) {
	const [open, setOpen] = useState(false)

	const form = useForm<FormValues>({
		defaultValues: {
			message: '',
			type: 'Harian',
		},
	})

	const { mutate: createReport, isPending } = useCreateReport()

	const onSubmit = (data: FormValues) => {
		if (!projectId) return

		createReport(
			{ ...data, projectId },
			{
				onSuccess: () => {
					form.reset()
					setOpen(false)
				},
			}
		)
	}

	return (
		<Dialog onOpenChange={setOpen} open={open}>
			<DialogTrigger asChild>
				<Button>
					<Plus size={18} className='text-white' />
					<span className='px-0.5'>Buat Laporan</span>
				</Button>
			</DialogTrigger>
			<DialogContent className='max-w-lg px-6'>
				<DialogHeader>
					<DialogTitle className='text-center'>Laporan Baru</DialogTitle>
					<DialogDescription className='text-center'>
						Pastikan semua data yang dimasukkan sudah benar sebelum disimpan.
					</DialogDescription>
				</DialogHeader>

				<FormReport form={form} onSubmit={onSubmit} isPending={isPending} />
			</DialogContent>
		</Dialog>
	)
}

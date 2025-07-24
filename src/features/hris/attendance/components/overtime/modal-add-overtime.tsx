import { parseAsTimestamp, useQueryStates } from 'nuqs'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Plus } from 'lucide-react'

import { handleFormError, handleFormSuccess } from '@/shared/utils/form'
import { Button } from '@/shared/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogTitle,
	DialogTrigger,
} from '@/shared/components/ui/dialog'

import { useCreateOvertime } from '../../api/overtime/use-create-overtime'
import { OvertimeForm } from '../../types'
import FormOvertime from './form-overtime'

export default function ModalAddOvertime() {
	const [open, setOpen] = useState(false)
	const [query] = useQueryStates({
		date: parseAsTimestamp,
	})

	const date = new Date(query.date || Date.now())
	date.setHours(0, 0, 0, 0)

	const defaultValues = {
		date: date || new Date(),
		employeeId: '',
		note: '',
		totalHour: 0,
		projectId: '',
	}

	const { mutate, isPending } = useCreateOvertime()
	const form = useForm<OvertimeForm>({
		defaultValues,
	})

	const onSubmit = (data: OvertimeForm) => {
		mutate(
			{
				...data,
				totalHour: Number(data.totalHour),
				date: data.date,
			},
			{
				onSuccess: handleFormSuccess(setOpen),
				onError: handleFormError<OvertimeForm>(form),
			}
		)
	}

	useEffect(() => {
		if (!open) {
			form.reset(defaultValues)
		}
	}, [open])

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button className='gap-2'>
					<Plus strokeWidth={2} size={16} className='text-white' />
					<span className='px-0.5'>Tambah Lembur</span>
				</Button>
			</DialogTrigger>
			<DialogContent className='p-6'>
				<DialogTitle>Lembur</DialogTitle>
				<DialogDescription>
					Pastikan semua data yang dimasukkan sudah benar sebelum disimpan.
				</DialogDescription>
				<FormOvertime form={form} isPending={isPending} onSubmit={onSubmit} />
			</DialogContent>
		</Dialog>
	)
}

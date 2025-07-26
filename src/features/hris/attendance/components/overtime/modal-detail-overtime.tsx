import { useForm } from 'react-hook-form'
import { useEffect } from 'react'
import { toast } from 'sonner'

import { handleFormError, handleFormSuccess } from '@/shared/utils/form'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogTitle,
} from '@/shared/components/ui/dialog'

import { useUpdateOvertime } from '../../api/overtime/use-update-overtime'
import { useOvertime } from '../../api/overtime/use-overtime'
import { OvertimeForm } from '../../types'

import FormOvertime from './form-overtime'

export default function ModalDetailOvertime({
	id,
	open,
	setOpen,
}: {
	id?: string
	open: boolean
	setOpen: (val: boolean) => void
}) {
	const defaultValues = {
		date: new Date(),
		employeeId: '',
		note: '',
		totalHour: 0,
	}

	const { data } = useOvertime({ id: open ? id : '' })
	const { mutate, isPending } = useUpdateOvertime()

	const form = useForm<OvertimeForm>({
		defaultValues,
	})

	useEffect(() => {
		if (data) {
			form.reset({
				totalHour: data.data?.totalHour,
				date: new Date(data.data?.date as string),
				employeeId: data.data?.employee.id,
				note: data.data?.note,
				projectId: data.data.projectId,
			})
		}
	}, [data])

	useEffect(() => {
		if (!open) {
			form.reset(defaultValues)
		}
	}, [open])

	const onSubmit = (data: OvertimeForm) => {
		if (!id) {
			toast.error('Id tidak boleh kosong')
			return
		}
		mutate(
			{ ...data, totalHour: Number(data.totalHour), id: id },
			{
				onSuccess: handleFormSuccess(setOpen),
				onError: handleFormError<OvertimeForm>(form),
			}
		)
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogContent className='p-6'>
				<DialogTitle>Lembur</DialogTitle>
				<DialogDescription>
					Pastikan semua data yang diperbarui sudah benar sebelum disimpan.
				</DialogDescription>
				<FormOvertime
					form={form}
					onSubmit={onSubmit}
					isPending={isPending}
					id={id}
				/>
			</DialogContent>
		</Dialog>
	)
}

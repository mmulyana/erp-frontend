import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { ChevronRight, Plus } from 'lucide-react'

import { Button } from '@/shared/components/ui/button'
import {
	Dialog,
	DialogTitle,
	DialogTrigger,
	DialogContent,
	DialogDescription,
} from '@/shared/components/ui/dialog'

import FormAssignedEmployee from './form-assigned-employee'
import { useUpdateAssignProject } from '../../api/employees/use-update-assign-project'
import { useProjectEmployee } from '../../api/employees/use-project-employee'
import { AssignedForm } from '../../types'
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/shared/components/ui/alert-dialog'
import { useDeleteAssignProject } from '../../api/employees/use-delete-assign-project'
import { useQueryClient } from '@tanstack/react-query'
import { keys } from '@/shared/constants/keys'
import { useParams } from 'react-router-dom'

export default function ModalAssignedDetail({ id }: { id?: string }) {
	const [open, setOpen] = useState(false)

	const { data } = useProjectEmployee({ id: open ? id : '' })
	const { mutate, isPending } = useUpdateAssignProject()

	const form = useForm<AssignedForm>({
		defaultValues: {
			employeeId: '',
			projectId: id,
		},
	})

	const submit = (data: AssignedForm) => {
		if (!id) return
		mutate(
			{
				id,
				startDate: data.startDate.toString(),
				endDate: data.endDate && data.endDate.toString(),
			},
			{
				onSuccess: () => {
					setOpen(false)
				},
			}
		)
	}

	useEffect(() => {
		if (data?.data) {
			const res = data.data
			form.reset({
				employeeId: res.employeeId,
				startDate: res.startDate ? new Date(res.startDate) : undefined,
				endDate: res.endDate ? new Date(res.endDate) : undefined,
			})
		}
	}, [data])

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button
					variant='outline'
					className='w-8 h-8 p-0 transition-all ease-in'
				>
					<ChevronRight />
				</Button>
			</DialogTrigger>
			<DialogContent className='p-6'>
				<DialogTitle>Penugasan pegawai</DialogTitle>
				<DialogDescription>
					Pastikan semua data yang dimasukkan sudah benar sebelum disimpan.
				</DialogDescription>
				<FormAssignedEmployee
					form={form}
					onSubmit={submit}
					variant='edit'
					isPending={isPending}
					modal={<ModalDelete id={id} onClose={() => setOpen(false)} />}
				/>
			</DialogContent>
		</Dialog>
	)
}

function ModalDelete({ onClose, id }: { id?: string; onClose?: () => void }) {
	const { id: projectId } = useParams()
	const queryClient = useQueryClient()
	const [open, setOpen] = useState(false)

	const { mutate } = useDeleteAssignProject()

	return (
		<AlertDialog open={open} onOpenChange={setOpen}>
			<AlertDialogTrigger asChild>
				<Button variant='ghost' className='text-error hover:bg-error hover:text-white' type='button'>
					Hapus
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>
						Yakin ingin menghapus penugasan ini?
					</AlertDialogTitle>
					<AlertDialogDescription>
						Tindakan ini tidak dapat dibatalkan. Hubungi admin jika tidak
						sengaja terhapus.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Batal</AlertDialogCancel>
					<AlertDialogAction
						className='bg-error'
						onClick={() => {
							if (id) {
								mutate(
									{ id },
									{
										onSuccess: () => {
											setOpen(false)
											queryClient.invalidateQueries({
												queryKey: [keys.projectEmployee, projectId],
											})
											onClose?.()
										},
									}
								)
							}
						}}
					>
						Hapus
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}

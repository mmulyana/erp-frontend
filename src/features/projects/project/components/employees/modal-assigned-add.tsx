import { useForm } from 'react-hook-form'
import { Plus } from 'lucide-react'
import { useState } from 'react'

import { Button } from '@/shared/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogTitle,
	DialogTrigger,
} from '@/shared/components/ui/dialog'

import FormAssignedEmployee from './form-assigned-employee'
import { useCreateAssignProject } from '../../api/employees/use-create-assign-project'
import { AssignedForm } from '../../types'

export default function ModalAssignedAdd({ id }: { id?: string }) {
	const [open, setOpen] = useState(false)

	const form = useForm<AssignedForm>({
		defaultValues: {
			employeeId: '',
			projectId: id,
			startDate: new Date(),
		},
	})
	const { mutate, isPending } = useCreateAssignProject()

	const submit = (data: any) => {
		if (!id) return
		mutate(
			{
				employeeId: data.employeeId,
				projectId: id,
				startDate: new Date().toDateString(),
			},
			{
				onSuccess: () => {
					setOpen(false)
				},
			}
		)
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button variant='outline' className='gap-1 w-full h-10'>
					<Plus size={16} />
					<span className='px-0.5'>Tambah</span>
				</Button>
			</DialogTrigger>
			<DialogContent className='p-6'>
				<DialogTitle>Pegawai baru</DialogTitle>
				<DialogDescription>
					Pastikan semua data yang dimasukkan sudah benar sebelum disimpan.
				</DialogDescription>
				<FormAssignedEmployee
					form={form}
					onSubmit={submit}
					variant='add'
					isPending={isPending}
				/>
			</DialogContent>
		</Dialog>
	)
}

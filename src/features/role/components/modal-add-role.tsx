import { useForm } from 'react-hook-form'
import { Plus } from 'lucide-react'
import { useState } from 'react'

import { handleFormError, handleFormSuccess } from '@/shared/utils/form'
import { Button } from '@/shared/components/ui/button'
import { Role } from '@/shared/types/api'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/shared/components/ui/dialog'

import { useCreateRole } from '../api/use-create-role'
import { FormRole } from './form-role'

export default function ModalAddRole() {
	const [open, setOpen] = useState(false)

	const { mutate, isPending } = useCreateRole()

	const form = useForm<Partial<Role>>({
		defaultValues: {
			name: '',
			description: '',
		},
	})

	const onSubmit = (payoad: Partial<Role>) => {
		mutate(payoad, {
			onSuccess: handleFormSuccess(setOpen),
			onError: handleFormError(form),
		})
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button>
					<Plus size={18} className='text-white' />
					<span className='px-0.5'>Tambah</span>
				</Button>
			</DialogTrigger>
			<DialogContent className='p-6'>
				<DialogHeader className='mb-2'>
					<DialogTitle className='text-center'>Role</DialogTitle>
					<DialogDescription className='text-center'>
						Pastikan semua data yang dimasukkan sudah benar sebelum disimpan.
					</DialogDescription>
				</DialogHeader>
				<FormRole form={form} onSubmit={onSubmit} isPending={isPending} />
			</DialogContent>
		</Dialog>
	)
}

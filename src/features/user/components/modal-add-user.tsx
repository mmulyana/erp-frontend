import { Button } from '@/shared/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/shared/components/ui/dialog'
import { User } from '@/shared/types/api'
import { Plus } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { FormUser } from './form-user'
import { useCreateUser } from '../api/use-create-user'
import { handleFormError, handleFormSuccess } from '@/shared/utils/form'

export default function ModalAddUser() {
	const [open, setOpen] = useState(false)

	const { mutate, isPending } = useCreateUser()

	const form = useForm<Partial<User>>({
		defaultValues: {
			username: '',
			roleId: '',
		},
	})

	const onSubmit = (payoad: Partial<User>) => {
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
					<DialogTitle className='text-center'>User</DialogTitle>
					<DialogDescription className='text-center'>
						Pastikan semua data yang dimasukkan sudah benar sebelum disimpan.
					</DialogDescription>
				</DialogHeader>
				<FormUser form={form} onSubmit={onSubmit} isPending={isPending} />
			</DialogContent>
		</Dialog>
	)
}

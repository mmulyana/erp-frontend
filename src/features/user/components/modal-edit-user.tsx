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
import { Pencil, Plus } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { FormUser } from './form-user'
import { useCreateUser } from '../api/use-create-user'
import { handleFormError, handleFormSuccess } from '@/shared/utils/form'
import { useUser } from '../api/use-user'
import { useUpdateUser } from '../api/use-update-user'

type props = {
	id?: string
}
export default function ModalEditUser({ id }: props) {
	const [open, setOpen] = useState(false)

	const { mutate, isPending } = useUpdateUser()

	const { data } = useUser({ id: open ? id : '' })

	const form = useForm<Partial<User>>({
		defaultValues: {
			username: '',
			roleId: '',
		},
	})

	useEffect(() => {
		if (data?.data) {
			const res = data.data
			form.reset({
				username: res.username,
				email: res.email,
				phone: res.phone,
				roleId: res.roleId,
			})
		}
	}, [data])

	const onSubmit = (payoad: Partial<User>) => {
		mutate(
			{ id, ...payoad },
			{
				onSuccess: handleFormSuccess(setOpen),
				onError: handleFormError(form),
			}
		)
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button variant='outline'>
					<Pencil size={16} />
					<span className='px-0.5'>Edit</span>
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

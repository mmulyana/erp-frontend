import { useForm } from 'react-hook-form'
import { Pencil, Plus } from 'lucide-react'
import { useEffect, useState } from 'react'

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

import { FormRole } from './form-role'
import { useUpdateRole } from '../api/use-update-role'
import { useRole } from '../api/use-role'
import { useParams } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'
import { keys } from '@/shared/constants/keys'

export default function ModalDetailRole() {
	const queryClient = useQueryClient()
	const { id } = useParams()
	const [open, setOpen] = useState(false)

	const { data } = useRole({ id: open ? id : '' })
	const { mutate, isPending } = useUpdateRole()

	const form = useForm<Partial<Role>>({
		defaultValues: {
			name: '',
			description: '',
		},
	})

	useEffect(() => {
		if (data?.data) {
			const res = data.data
			form.reset({
				name: res.name,
				description: res.description,
			})
		}
	}, [data])

	const onSubmit = (payoad: Partial<Role>) => {
		mutate(
			{ id, ...payoad },
			{
				onSuccess: handleFormSuccess(setOpen, () => {
					queryClient.invalidateQueries({ queryKey: [keys.rolesDetail, id] })
				}),
				onError: handleFormError(form),
			}
		)
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button variant='outline' className='gap-1'>
					<Pencil size={16} />
					<span className='px-0.5'>Edit</span>
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

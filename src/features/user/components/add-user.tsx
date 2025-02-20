import { useQueryClient } from '@tanstack/react-query'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useEffect } from 'react'

import { useApiData } from '@/shared/hooks/use-api-data'

import { KEYS } from '@/utils/constant/_keys'

import Modal, { ModalContainer } from '@/components/modal-v2'
import { Form, FormField } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useCreateUser } from '../api/use-create-user'
import { useUpdateUser } from '../api/use-update-user'
import { useUser } from '../api/use-user'
import { CreateUserSchema } from '../schema'
import { CreateUser } from '../types'
import { AxiosError } from 'axios'
import { ErrorResponse } from '@/shared/types'
import { ApiError } from '@/utils/types/api'

type Props = {
	open: boolean
	setOpen: (val: boolean) => void
	id?: string | null
}
export default function AddUser({ open, setOpen, id }: Props) {
	const queryClient = useQueryClient()

	const { mutate: create } = useCreateUser()
	const { mutate: update } = useUpdateUser()

	const { data: detail, isLoading } = useApiData(useUser({ id }))

	const form = useForm<CreateUser>({
		resolver: zodResolver(CreateUserSchema),
		defaultValues: {
			username: '',
			email: '',
			phone: '',
		},
	})

	const submit = (payload: CreateUser) => {
		if (id) {
			update(
				{ id, payload },
				{
					onSuccess: () => {
						form.reset()
						setOpen(false)
						queryClient.invalidateQueries({ queryKey: [KEYS.ACCOUNT] })
					},
					onError: (err) => {
						const errors = err as AxiosError<ApiError>

						if (errors.response?.data?.errors) {
							const validationErrors = errors.response.data.errors

							validationErrors.forEach((err: any) => {
								err.path.forEach((fieldName: string) => {
									if (fieldName in payload) {
										form.setError(
											fieldName as keyof CreateUser,
											{
												type: err.code,
												message: err.message,
											},
											{ shouldFocus: true }
										)
									}
								})
							})
						}
					},
				}
			)
			return
		}
		create(payload, {
			onSuccess: () => {
				form.reset()
				setOpen(false)
			},
		})
	}

	useEffect(() => {
		if (open && detail && !!id && !isLoading) {
			form.reset({
				username: detail.username,
				email: detail.email ?? '',
				phone: detail.phone ?? '',
			})
		}
	}, [open, detail, id, isLoading])

	useEffect(() => {
		if (!open) form.reset({ username: '', email: '', phone: '' })
	}, [open])

	return (
		<Modal open={open} setOpen={setOpen} title='Buat user baru'>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(submit)}>
					<ModalContainer setOpen={setOpen}>
						<FormField
							control={form.control}
							name='username'
							label='Nama'
							render={({ field }) => <Input {...field} />}
						/>
						<div className='grid grid-cols-2 gap-4'>
							<FormField
								control={form.control}
								name='email'
								label='Email'
								render={({ field }) => <Input {...field} />}
							/>
							<FormField
								control={form.control}
								name='phone'
								label='Nomor Telp'
								render={({ field }) => <Input {...field} />}
							/>
						</div>
					</ModalContainer>
				</form>
			</Form>
		</Modal>
	)
}

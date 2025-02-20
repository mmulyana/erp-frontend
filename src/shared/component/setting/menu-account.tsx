import { useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { useAtomValue } from 'jotai'
import { useEffect } from 'react'

import PhotoProfile from '@/components/common/photo-profile'
import { Form, FormField } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import { baseUrl } from '@/utils/constant/_urls'
import { keys } from '@/utils/constant/_keys'
import { User } from '@/utils/types/api'
import { userAtom } from '@/shared/store/auth'
import { useUpdateUser } from '@/features/user/api/use-update-user'

export default function MenuAccount() {
	const queryClient = useQueryClient()

	const user = useAtomValue(userAtom)

	const { mutate: update } = useUpdateUser()

	const form = useForm<User>({
		defaultValues: {
			email: '',
			username: '',
			phone: '',
		},
	})

	const submit = (data: Partial<User>) => {
		if (!user?.id) return
		update({
			id: user?.id,
			payload: {
				email: data.email,
				username: data.username,
				phone: data.phone,
			},
		})
	}

	useEffect(() => {
		if (!!user) {
			form.reset({
				username: user.username,
				email: user.email,
				phone: user.phone,
			})
		}
	}, [user])

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(submit)}>
				<div className='flex flex-col gap-6 max-w-sm p-6'>
					<div>
						<Label className='mb-3 block font-normal text-dark/80'>Photo</Label>
						{/* <PhotoProfile
							size={64}
							defaultPreview={
								user?.photoUrl ? baseUrl + '/img/' + user?.photoUrl : null
							}
							onUpdate={(photo) => {
								if (!user?.id) return
								update(
									{ id: user?.id, payload: { photo } },
									{
										onSuccess: () => {
											queryClient.invalidateQueries({
												queryKey: [keys.ACCOUNT],
											})
										},
									}
								)
							}}
							onRemove={() => {
								if (!user?.id) return
								update({ id: user.id, payload: { photoUrl: null } })
							}}
						/> */}
					</div>
					<div>
						<FormField
							label='Nama'
							control={form.control}
							name='username'
							render={({ field }) => <Input className='w-full' {...field} />}
						/>
					</div>
					<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
						<FormField
							label='Email'
							control={form.control}
							name='email'
							render={({ field }) => <Input {...field} />}
						/>
						<FormField
							label='No. Telp'
							control={form.control}
							name='phone'
							render={({ field }) => <Input {...field} />}
						/>
					</div>
					<Button className='w-fit'>Simpan</Button>
				</div>
			</form>
		</Form>
	)
}

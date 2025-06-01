import { useForm } from 'react-hook-form'
import { User } from 'lucide-react'

import CardV1 from '@/shared/components/common/card-v1'
import { ImageUpload } from '@/shared/components/common/image-upload'
import { Button } from '@/shared/components/ui/button'
import { Input } from '@/shared/components/ui/input'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/shared/components/ui/form'
import { useUpdateInfo } from '../api/use-update-info'
import { UserForm } from '../types'
import { useAtomValue } from 'jotai'
import { userAtom } from '@/shared/store/auth'
import { handleFormError } from '@/shared/utils/form'
import { useEffect } from 'react'
import { baseUrl } from '@/shared/constants/urls'
import ButtonSubmit from '@/shared/components/common/button-submit'

export default function FormInformation() {
	const user = useAtomValue(userAtom)
	const { mutate, isPending } = useUpdateInfo()

	const form = useForm<UserForm>({
		defaultValues: {
			username: '',
			email: '',
			phone: '',
			photoUrl: null,
		},
	})

	useEffect(() => {
		if (user) {
			form.reset({
				username: user?.username,
				email: user?.email,
				phone: user?.phone,
				photoUrl: user?.photoUrl,
			})
		}
	}, [user])

	const photoWatch = form.watch('photoUrl')

	const onSubmit = (values: UserForm) => {
		if (!user?.id) return

		mutate(
			{ id: user?.id, ...values },
			{
				onError: handleFormError(form),
			}
		)
	}

	return (
		<CardV1
			title='Akun'
			icon={<User size={18} />}
			style={{ content: 'pt-2 grid grid-cols-1 md:grid-cols-2 gap-4' }}
		>
			<div className='max-w-[280px]'>
				<p className='text-lg font-medium text-ink-primary'>Pengaturan Akun</p>
				<p className='text-sm text-ink-primary/50'>
					Kelola informasi pribadi dan keamanan akun Anda.
				</p>
			</div>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className='flex flex-col gap-4'
				>
					<FormItem className='flex flex-col'>
						<FormLabel>Foto</FormLabel>
						<ImageUpload
							value={photoWatch}
							onChange={(e) => form.setValue('photoUrl', e)}
						/>
					</FormItem>
					<FormField
						control={form.control}
						name='username'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Username</FormLabel>
								<FormControl>
									<Input {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<div className='grid grid-cols-2 gap-4'>
						<FormField
							control={form.control}
							name='phone'
							render={({ field }) => (
								<FormItem>
									<FormLabel>No. Telp</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='email'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					<div className='flex justify-end pt-2'>
						<ButtonSubmit isPending={isPending} />
					</div>
				</form>
			</Form>
		</CardV1>
	)
}

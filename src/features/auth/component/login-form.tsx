import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import InputPassword from '@/shared/components/fields/password-field'
import { Form, FormField } from '@/shared/components/ui/form'
import { handleFormError } from '@/shared/utils/form'
import { Button } from '@/shared/components/ui/button'
import { Input } from '@/shared/components/ui/input'
import { testIds } from '@/shared/constants/testId'

import Logo from '/images/logo.png'

import { useLogin } from '../api/use-login'
import { LoginSchema } from '../schema'

type FormData = z.infer<typeof LoginSchema>

export default function LoginForm({ guestMode }: { guestMode?: boolean }) {
	const { mutate } = useLogin()

	const form = useForm<FormData>({
		resolver: zodResolver(LoginSchema),
		defaultValues: {
			username: '',
			password: '',
		},
	})

	const onSubmit = async (payload: FormData) => {
		mutate(
			{ password: payload.password, username: payload.username },
			{
				onError: handleFormError<FormData>(form),
			}
		)
	}

	const loginAsGuest = () => {
		form.reset({
			password: 'password',
			username: 'GUEST',
		})

		form.handleSubmit(onSubmit)()
	}

	return (
		<>
			<img
				src={Logo}
				alt='logo erp'
				className='w-12 h-12 absolute left-10 top-10'
			/>
			<div className='flex flex-col gap-4 max-w-full px-4 w-[432px]'>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className='w-full flex flex-col gap-8 mt-6'
					>
						<div>
							<h1 className='text-4xl text-[#2C2C30] mb-4 font-medium'>
								Login
							</h1>
							<p className='text-[#828599]'>
								Silahkan login untuk mengakses sistem
							</p>
						</div>
						<div className='flex flex-col gap-6'>
							<FormField
								control={form.control}
								name='username'
								render={({ field }) => (
									<Input
										placeholder='No telepon/Email/Username'
										autoComplete='none'
										className='bg-[#FAFBFF] border border-[#EFEFEF]'
										data-testid={testIds.loginInputName}
										{...field}
									/>
								)}
							/>

							<InputPassword
								name='password'
								className='bg-[#FAFBFF] border border-[#EFEFEF]'
							/>
						</div>

						<Button
							type='submit'
							variant='default'
							className='h-fit py-2.5 gap-2 bg-brand border-none'
							data-testid={testIds.loginButtonSubmit}
						>
							Login
						</Button>
					</form>
				</Form>
				{guestMode && (
					<div className='p-6 border border-yellow-500 rounded-xl bg-amber-50/50'>
						<h2 className='text-lg font-semibold mb-2 text-yellow-600'>
							Mode Tamu
						</h2>
						<p className='mb-4 text-sm text-yellow-600'>
							Gunakan akun tamu untuk masuk kedalam sistem
						</p>
						<Button
							onClick={loginAsGuest}
							variant='secondary'
							className='w-full py-2.5 h-fit bg-amber-500'
						>
							Masuk sebagai tamu
						</Button>
					</div>
				)}
			</div>
		</>
	)
}

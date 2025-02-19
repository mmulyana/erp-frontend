import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { LogIn } from 'lucide-react'
import { useState } from 'react'
import { z } from 'zod'

import { isValidEmail } from '@/utils/is-email-valid'
import { ErrorResponse } from '@/shared/types'

import InputPassword from '@/components/common/input-password'
import { Form, FormField } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import Logo from '/public/logo2.svg'

import { useLogin } from '../api/use-login'
import { LoginSchema } from '../schema'
import { Payload } from '../types'
import { AxiosError } from 'axios'
import { TEST_ID } from '@/utils/constant/_testId'

type FormData = z.infer<typeof LoginSchema>

export default function LoginForm() {
	const { mutate } = useLogin()

	const [isPhone, setPhone] = useState(true)

	const form = useForm<FormData>({
		resolver: zodResolver(LoginSchema),
		defaultValues: {
			username: '',
			phone: '',
			password: '',
		},
	})

	const onSubmit = async (data: FormData) => {
		const payload: Payload = {
			password: data.password,
		}

		if (!isPhone && data.username) {
			if (isValidEmail(data.username)) {
				payload.email = data.username
			} else {
				payload.username = data.username
			}
		} else {
			payload.phone = data.phone as string
		}

		mutate(payload, {
			onError: (err) => {
				const errors = err as AxiosError<ErrorResponse<any>>

				if (errors.response?.data?.errors) {
					const validationErrors = errors.response.data.errors

					validationErrors.forEach((err: any) => {
						err.path.forEach((fieldName: string) => {
							if (fieldName in data) {
								form.setError(
									fieldName as keyof FormData,
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
		})
	}

	const handleSwitchInput = () => {
		form.reset({
			...form.getValues(),
			username: '',
			phone: '',
		})
		setPhone(!isPhone)
	}

	return (
		<>
			<div className='flex flex-col gap-4'>
				<img src={Logo} alt='logo erp' className='w-12 h-12' />
				<div className='w-full md:w-[calc(100%-72px)] flex flex-col justify-center'>
					<p className='text-dark text-xl font-medium'>
						Selamat Datang Kembali
					</p>
					<p className='text-dark/50 text-sm'>
						Login dengan akun Anda untuk melanjutkan
					</p>
				</div>
			</div>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className='w-full flex flex-col gap-2.5 mt-6'
				>
					<div>
						{isPhone ? (
							<FormField
								control={form.control}
								name='phone'
								label='Nomor telepon'
								render={({ field }) => (
									<Input
										placeholder='Masukkan nomor telepon'
										{...field}
										autoComplete='none'
										className='bg-white/50'
										data-testid={TEST_ID.LOGIN_INPUT_PHONE}
									/>
								)}
							/>
						) : (
							<FormField
								control={form.control}
								name='username'
								label='Nama/Email'
								render={({ field }) => (
									<Input
										placeholder='Name'
										{...field}
										autoComplete='none'
										className='bg-white/50'
										data-testid={TEST_ID.LOGIN_INPUT_NAME}
									/>
								)}
							/>
						)}
						<div className='flex justify-end w-full pt-2'>
							<Button
								type='button'
								variant='ghost'
								className='text-right text-blue-primary px-0 py-0 h-fit'
								onClick={handleSwitchInput}
								data-testid={TEST_ID.LOGIN_BUTTON_CHANGE}
							>
								{isPhone
									? 'Masuk menggunakan email/username'
									: 'Masuk menggunakan nomor telp'}
							</Button>
						</div>
					</div>

					<InputPassword
						label='Password'
						name='password'
						className='bg-white/50'
					/>

					<Button
						type='submit'
						variant='default'
						className='mt-4 h-fit py-2.5 gap-2'
						data-testid={TEST_ID.LOGIN_BUTTON_SUBMIT}
					>
						Masuk
						<LogIn size={20} />
					</Button>
				</form>
			</Form>
		</>
	)
}

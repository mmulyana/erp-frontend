import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { AxiosError } from 'axios'
import { z } from 'zod'

import { ErrorResponse } from '@/shared/types'

import InputPassword from '@/components/common/input-password'
import { Form, FormField } from '@/shared/components/ui/form'
import { Button } from '@/shared/components/ui/button'
import { Input } from '@/shared/components/ui/input'
import { testIds } from '@/shared/constants/testId'

import LogoGoogle from '/public/images/logo-google.png'
import Logo from '/public/images/logo.png'

import { useLogin } from '../api/use-login'
import { LoginSchema } from '../schema'
import { Payload } from '../types'

type FormData = z.infer<typeof LoginSchema>

export default function LoginForm() {
	const { mutate } = useLogin()

	const form = useForm<FormData>({
		resolver: zodResolver(LoginSchema),
		defaultValues: {
			username: '',
			password: '',
		},
	})

	const onSubmit = async (data: FormData) => {
		const payload: Payload = {
			password: data.password,
		}

		payload.username = data.username
		payload.phone = data.phone as string

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
							className='h-fit py-2.5 gap-2 bg-[#475DEF] border-none'
							data-testid={testIds.loginButtonSubmit}
						>
							Login
						</Button>

						<div className='relative mt-2'>
							<div className='h-[1px] w-full bg-[#EFEFEF] absolute top-1/2 left-0 -translate-y-1/2'></div>
							<div className='bg-white px-4 absolute  top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2'>
								<p className='text-[#828599]'>Atau</p>
							</div>
						</div>

						<Button
							type='button'
							className='text-[#828599] font-medium bg-white gap-2 py-2.5 border-[#EFEFEF] h-fit'
						>
							<img src={LogoGoogle} className='w-5 h-5' />
							Masuk dengan google
						</Button>
					</form>
				</Form>
			</div>
		</>
	)
}

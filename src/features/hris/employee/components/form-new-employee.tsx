import { BriefcaseBusiness, MapPinned, User2 } from 'lucide-react'
import { NumericFormat } from 'react-number-format'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { z } from 'zod'

import { ImageUpload } from '@/shared/components/common/image-upload'
import { MultiStep } from '@/shared/components/common/multi-step'
import { Textarea } from '@/shared/components/ui/textarea'
import { Input } from '@/shared/components/ui/input'
import { paths } from '@/shared/constants/paths'
import {
	Form,
	FormItem,
	FormLabel,
	FormField,
	FormMessage,
	FormDescription,
	FormControl,
} from '@/shared/components/ui/form'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/shared/components/ui/select'

import { useCreateEmployee } from '@/features/hris/employee/api/use-create-employee'
import { EmployeeSchema } from '@/features/hris/employee/schema'

export default function FormNewEmployee() {
	const navigate = useNavigate()

	const [step, setStep] = useState(0)

	const { mutate } = useCreateEmployee()
	const form = useForm<z.infer<typeof EmployeeSchema>>({
		defaultValues: {
			fullname: '',
			address: '',
			birthDate: '',
			joinedAt: '',
			lastEducation: '',
			overtimeSalary: undefined,
			phone: '',
			position: '',
			salary: undefined,
		},
	})

	const onCreate = (payload: z.infer<typeof EmployeeSchema>) => {
		mutate(
			{ ...payload },
			{
				onSuccess: () => {
					form.reset()
					navigate(paths.hrisMasterDataEmployee)
				},
				onError: (error: any) => {
					if (error?.response?.data?.errors) {
						error.response.data.errors.forEach((err: any) => {
							const field = err.path?.[0]
							const message = err.message
							if (field) {
								form.setError(field, { message })
							}
						})
					}
				},
			}
		)
	}

	const steps = [
		{
			title: 'Profil',
			icon: <User2 size={16} />,
			content: (
				<>
					<FormField
						name='fullname'
						control={form.control}
						render={({ field }) => (
							<FormItem className='border-b border-border p-10 flex justify-between items-start flex-col md:flex-row gap-2 md:gap-0'>
								<div>
									<FormLabel className='text-ink-primary text-base font-normal'>
										Nama <span className='text-error'>*</span>
									</FormLabel>
									<FormDescription className='text-ink-light'>
										Masukkan nama lengkap pegawai
									</FormDescription>
								</div>
								<div className='w-full md:w-72'>
									<FormControl>
										<Input
											{...field}
											onChange={(e) => {
												field.onChange(e)
												form.clearErrors('fullname')
											}}
											className='bg-surface-secondary w-full'
											placeholder='Nama lengkap'
										/>
									</FormControl>
									<FormMessage />
								</div>
							</FormItem>
						)}
					/>
					<div className='border-b border-border p-10 flex justify-between items-start md:items-center flex-col md:flex-row gap-2 md:gap-0'>
						<div>
							<FormLabel className='text-ink-primary text-base font-normal'>
								Foto
							</FormLabel>
							<FormDescription className='text-ink-light'>
								Tambah foto agar mudah dikenali
							</FormDescription>
						</div>
						<ImageUpload name='photoUrl' />
					</div>
					<div className='p-10 grid grid-cols-1 md:grid-cols-2 gap-6'>
						<FormField
							control={form.control}
							name='birthDate'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Tanggal Lahir</FormLabel>
									<FormControl>
										<Input
											{...field}
											type='date'
											className='block bg-surface-secondary'
										/>
									</FormControl>
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='lastEducation'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Pendidikan terakhir</FormLabel>
									<FormControl>
										<Select onValueChange={field.onChange}>
											<SelectTrigger className='bg-surface-secondary'>
												<SelectValue placeholder='Pend. Terakhir' />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value='sd'>SD</SelectItem>
												<SelectItem value='smp'>SMP</SelectItem>
												<SelectItem value='sma'>SMA</SelectItem>
												<SelectItem value='s1'>S1</SelectItem>
												<SelectItem value='s2'>S2</SelectItem>
												<SelectItem value='s3'>S3</SelectItem>
											</SelectContent>
										</Select>
									</FormControl>
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='joinedAt'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Tanggal bergabung</FormLabel>
									<FormControl>
										<Input
											{...field}
											type='date'
											className='block bg-surface-secondary'
										/>
									</FormControl>
								</FormItem>
							)}
						/>
					</div>
				</>
			),
		},
		{
			title: 'Jabatan',
			icon: <BriefcaseBusiness size={16} />,
			content: (
				<>
					<div className='border-b border-border p-10 flex justify-between items-start flex-col md:flex-row gap-2 md:gap-0'>
						<div>
							<FormLabel className='text-ink-primary text-base font-normal'>
								Jabatan
							</FormLabel>
							<FormDescription className='text-ink-light'>
								Tambahkan jabatan pegawai
							</FormDescription>
						</div>
						<FormField
							name='position'
							control={form.control}
							render={({ field }) => (
								<FormItem className='w-full md:w-72'>
									<Input
										{...field}
										className='bg-surface-secondary w-full max-w-full'
										placeholder='Pilih jabatan'
									/>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<div className='p-10 grid grid-cols-1 md:grid-cols-2 gap-6'>
						<FormField
							control={form.control}
							name='salary'
							render={({ field }) => {
								const usedField = { ...field }
								delete (usedField as any).onChange

								return (
									<FormItem>
										<FormLabel>
											Gaji pokok{' '}
											<span className='text-ink-light'>(per hari)</span>
										</FormLabel>
										<FormControl>
											<div className='relative'>
												<div className='absolute top-1/2 -translate-y-1/2 px-3 left-[1px] border-r border-border h-[calc(100%-2px)] flex justify-center items-center select-none text-sm text-ink-secondary font-medium'>
													Rp
												</div>
												<NumericFormat
													type='text'
													thousandSeparator='.'
													decimalSeparator=','
													customInput={Input}
													className='h-10 w-full pl-12'
													{...usedField}
													onValueChange={(values) => {
														field.onChange(Number(values.value))
													}}
												/>
											</div>
										</FormControl>
									</FormItem>
								)
							}}
						/>
						<FormField
							control={form.control}
							name='overtimeSalary'
							render={({ field }) => {
								const usedField = { ...field }
								delete (usedField as any).onChange

								return (
									<FormItem>
										<FormLabel>
											Gaji Lembur{' '}
											<span className='text-ink-light'>(per jam)</span>
										</FormLabel>
										<FormControl>
											<div className='relative'>
												<div className='absolute top-1/2 -translate-y-1/2 px-3 left-[1px] border-r border-border h-[calc(100%-2px)] flex justify-center items-center select-none text-sm text-ink-secondary font-medium'>
													Rp
												</div>
												<NumericFormat
													type='text'
													thousandSeparator='.'
													decimalSeparator=','
													customInput={Input}
													className='h-10 w-full pl-12'
													{...usedField}
													onValueChange={(values) => {
														field.onChange(Number(values.value))
													}}
												/>
											</div>
										</FormControl>
									</FormItem>
								)
							}}
						/>
					</div>
				</>
			),
		},
		{
			title: 'Alamat dan Kontak',
			icon: <MapPinned size={16} />,
			content: (
				<>
					<div className='border-b border-border p-10 flex justify-between items-start flex-col md:flex-row'>
						<div>
							<FormLabel className='text-ink-primary text-base font-normal'>
								Alamat
							</FormLabel>
							<FormDescription className='text-ink-light'>
								Masukan alamat domisili pegawai
							</FormDescription>
						</div>
						<FormField
							name='address'
							control={form.control}
							render={({ field }) => (
								<FormItem className='w-full md:w-72'>
									<Textarea
										{...field}
										className='bg-surface-secondary w-full mt-2 md:mt-0 shadow-none'
									>
										Alamat
									</Textarea>
								</FormItem>
							)}
						/>
					</div>
					<div className='p-10 flex justify-between items-start md:items-center flex-col md:flex-row gap-2 md:gap-0'>
						<div>
							<FormLabel className='text-ink-primary text-base font-normal'>
								Nomor telepon
							</FormLabel>
							<FormDescription className='text-ink-light'>
								Masukan nomor telepon yang bisa dihubungi
							</FormDescription>
						</div>
						<FormField
							name='phone'
							control={form.control}
							render={({ field }) => (
								<FormItem className='w-full md:w-72'>
									<Input {...field} className='bg-surface-secondary w-full' />
								</FormItem>
							)}
						/>
					</div>
				</>
			),
		},
	]

	return (
		<div className='p-6'>
			<Form {...form}>
				<MultiStep
					steps={steps}
					currentStep={step}
					onNext={() => setStep((prev) => prev + 1)}
					onBack={() => setStep((prev) => prev - 1)}
					onFinish={() => form.handleSubmit(onCreate)()}
				/>
			</Form>
		</div>
	)
}

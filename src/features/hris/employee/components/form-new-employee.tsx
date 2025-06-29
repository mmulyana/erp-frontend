import { BriefcaseBusiness, MapPinned, User2 } from 'lucide-react'
import { NumericFormat } from 'react-number-format'
import { UseFormReturn } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { useSetAtom } from 'jotai'

import { ImageUpload } from '@/shared/components/common/image-upload'
import { MultiStep } from '@/shared/components/common/multi-step'
import { RadioGroup, RadioGroupItem } from '@/shared/components/ui/radio-group'
import { Textarea } from '@/shared/components/ui/textarea'
import { atomProgress } from '@/shared/store/progress'
import { Input } from '@/shared/components/ui/input'
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

import { EmployeeForm } from '../types'
import { cn } from '@/shared/utils/cn'

const options = [
	{
		id: 'daily',
		name: 'Harian',
		description: 'Pegawai gaji harian',
	},
	{
		id: 'monthly',
		name: 'Bulanan',
		description: 'Staf perusahaan',
	},
]

export default function FormNewEmployee({
	form,
	onSubmit,
}: {
	form: UseFormReturn<EmployeeForm>
	onSubmit: (data: EmployeeForm) => void
}) {
	const [step, setStep] = useState(0)

	const setProgress = useSetAtom(atomProgress)
	const photoWatch = form.watch('photoUrl')
	const payType = form.watch('payType')

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
						<ImageUpload
							value={photoWatch}
							onChange={(e) => form.setValue('photoUrl', e)}
						/>
					</div>
					<div className='p-10 grid grid-cols-1 md:grid-cols-2 gap-6'>
						<FormField
							control={form.control}
							name='birthDate'
							render={({ field }) => (
								<FormItem className='flex flex-col'>
									<FormLabel>Tanggal lahir</FormLabel>
									<Input
										onChange={field.onChange}
										className='block'
										type='date'
									/>
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
												{['sd', 'smp', 'sma', 's1', 's2', 's3'].map(
													(i, index) => (
														<SelectItem key={index} value={i}>
															{i}
														</SelectItem>
													)
												)}
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
											onChange={field.onChange}
											className='block'
											type='date'
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
					<div className='px-10 py-6 grid grid-cols-1 md:grid-cols-2 gap-6'>
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
											<span className='text-ink-light'>
												({payType == 'daily' ? 'per hari' : 'per bulan'})
											</span>
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
					<div className='px-10 pb-10'>
						<FormField
							control={form.control}
							name='payType'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Tipe Gaji</FormLabel>
									<RadioGroup
										value={field.value}
										onValueChange={field.onChange}
										className='grid grid-cols-1 md:grid-cols-2 gap-4'
									>
										{options.map((option) => (
											<label
												key={option.id}
												htmlFor={option.id}
												className={cn(
													'relative flex items-center rounded-lg border p-4 cursor-pointer transition-colors',
													field.value === option.id
														? 'bg-blue-50 border-blue-600'
														: 'bg-white border-gray-200 hover:border-gray-300'
												)}
											>
												<div className='flex flex-col flex-1'>
													<span className='font-medium'>{option.name}</span>
													<span className='text-gray-500 text-sm'>
														{option.description}
													</span>
												</div>
												<div className='ml-auto'>
													<RadioGroupItem
														value={option.id}
														id={option.id}
														className={cn(
															'h-6 w-6 border-2',
															field.value === option.id
																? 'border-blue-600 text-blue-600'
																: 'border-gray-300'
														)}
													/>
												</div>
											</label>
										))}
									</RadioGroup>
								</FormItem>
							)}
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

	useEffect(() => {
		const initialProgress = ((step + 1) / steps.length) * 100
		setProgress(initialProgress)

		return () => setProgress(0)
	}, [])

	const handleNext = () => {
		setStep((prev) => {
			const nextStep = prev + 1
			const percent = ((nextStep + 1) / steps.length) * 100
			setProgress(percent)
			return nextStep
		})
	}

	const handleBack = () => {
		setStep((prev) => {
			const prevStep = prev - 1
			const percent = ((prevStep + 1) / steps.length) * 100
			setProgress(percent)
			return prevStep
		})
	}

	return (
		<div className='p-6'>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<MultiStep
						steps={steps}
						currentStep={step}
						onNext={handleNext}
						onBack={handleBack}
					/>
				</form>
			</Form>
		</div>
	)
}

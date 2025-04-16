import { BriefcaseBusiness, MapPinned, User2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { z } from 'zod'

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
import { ImageUpload } from '@/shared/components/image-upload'
import { Textarea } from '@/shared/components/ui/textarea'
import { MultiStep } from '@/shared/components/multi-step'
import DetailLayout from '@/shared/layout/detail-layout'
import { Input } from '@/shared/components/ui/input'
import { paths } from '@/shared/constants/paths'

import { useCreateEmployee } from '@/features/hris/employee/api/use-create-employee'
import { EmployeeSchema } from '@/features/hris/employee/schema'

export default function NewEmployee() {
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
			overtimeSalary: 0,
			phone: '',
			position: '',
			salary: 0,
		},
	})

	const onCreate = () => {
		const payload = form.getValues()
		mutate(
			{ ...payload, photoName: 'testing' },
			{
				onSuccess: () => {
					form.reset()
					navigate(paths.hrisMasterDataEmployee)
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
					<div className='border-b border-border p-10 flex justify-between items-start flex-col md:flex-row gap-2 md:gap-0'>
						<div>
							<FormLabel className='text-ink-primary text-base font-normal'>
								Nama <span className='text-error'>*</span>
							</FormLabel>
							<FormDescription className='text-ink-light'>
								Masukkan nama lengkap pegawai
							</FormDescription>
						</div>
						<FormField
							name='fullname'
							control={form.control}
							render={({ field }) => (
								<FormItem className='w-full md:w-72'>
									<Input
										{...field}
										className='bg-surface-secondary w-full'
										placeholder='Nama lengkap'
									/>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
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
							render={({ field }) => (
								<FormItem>
									<FormLabel>Gaji pokok</FormLabel>
									<FormControl>
										<Input {...field} className='bg-surface-secondary' />
									</FormControl>
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='overtimeSalary'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Gaji lembur (per jam)</FormLabel>
									<FormControl>
										<Input {...field} className='bg-surface-secondary' />
									</FormControl>
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
	return (
		<DetailLayout title='Pegawai Baru' back={paths.hrisMasterDataEmployee}>
			<div className='p-6'>
				<Form {...form}>
					<MultiStep
						steps={steps}
						currentStep={step}
						onNext={() => setStep((prev) => prev + 1)}
						onBack={() => setStep((prev) => prev - 1)}
						onFinish={() => onCreate()}
					/>
				</Form>
			</div>
		</DetailLayout>
	)
}

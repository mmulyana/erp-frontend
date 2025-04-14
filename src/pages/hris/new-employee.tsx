import { BriefcaseBusiness, MapPinned, User2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { useState } from 'react'

import {
	Form,
	FormItem,
	FormLabel,
	FormField,
	FormMessage,
	FormDescription,
	FormControl,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

import { MultiStep } from '@/shared/component/multi-step'
import DetailLayout from '@/shared/layout/detail-layout'

import { paths } from '@/utils/constant/_paths'
import { ImageUpload } from '@/shared/component/image-upload'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'

export default function NewEmployee() {
	const form = useForm({
		defaultValues: {
			fullname: '',
			photo_url: null,
			birth_date: '',
			last_education: '',
			sex: '',
			marital_status: '',
			join_date: '',
			position: '',
			basic_salary: 0,
			overtime_salary: 0,
			address: '',
			phone_number: '',
		},
	})
	const [step, setStep] = useState(0)

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
						<ImageUpload name='photo_url' />
					</div>
					<div className='p-10 grid grid-cols-1 md:grid-cols-2 gap-6'>
						<FormField
							control={form.control}
							name='birth_date'
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
							name='last_education'
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
							name='sex'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Jenis kelamin</FormLabel>
									<FormControl>
										<Select onValueChange={field.onChange}>
											<SelectTrigger className='bg-surface-secondary'>
												<SelectValue placeholder='Jenis kelamin' />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value='male'>Laki-laki</SelectItem>
												<SelectItem value='female'>Perempuan</SelectItem>
											</SelectContent>
										</Select>
									</FormControl>
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='marital_status'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Status Pernikahan</FormLabel>
									<FormControl>
										<Select onValueChange={field.onChange}>
											<SelectTrigger className='bg-surface-secondary'>
												<SelectValue placeholder='Status pernikahan' />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value='single'>Single</SelectItem>
												<SelectItem value='merried'>Menikah</SelectItem>
												<SelectItem value='divorce'>Cerai</SelectItem>
											</SelectContent>
										</Select>
									</FormControl>
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='join_date'
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
							name='basic_salary'
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
							name='overtime_salary'
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
							name='phone_number'
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
						onFinish={() => console.log(form.getValues())}
					/>
				</Form>
			</div>
		</DetailLayout>
	)
}

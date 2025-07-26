import { NumericFormat } from 'react-number-format'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Pencil } from 'lucide-react'

import { RadioGroup, RadioGroupItem } from '@/shared/components/ui/radio-group'
import { handleFormError, handleFormSuccess } from '@/shared/utils/form'
import ProtectedComponent from '@/shared/components/common/protected'
import { ImageUpload } from '@/shared/components/common/image-upload'
import ButtonSubmit from '@/shared/components/common/button-submit'
import { permissions } from '@/shared/constants/permissions'
import { Textarea } from '@/shared/components/ui/textarea'
import { Button } from '@/shared/components/ui/button'
import { Input } from '@/shared/components/ui/input'
import { educationOption, options } from '@/shared/constants/common'
import { cn } from '@/shared/utils/cn'
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogTitle,
	DialogTrigger,
} from '@/shared/components/ui/dialog'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
} from '@/shared/components/ui/form'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/shared/components/ui/select'

import { useUpdateEmployee } from '../api/use-update-employee'
import { useEmployee } from '../api/use-employee'
import { EmployeeForm } from '../types'

export default function ModalEditEmployee({
	variant = 'info',
}: {
	variant?: 'info' | 'address' | 'position'
}) {
	const { id } = useParams()

	const { data, isPending } = useEmployee(id)
	const { mutate } = useUpdateEmployee()

	const [open, setOpen] = useState(false)
	const form = useForm<Partial<EmployeeForm>>({
		defaultValues: {
			position: '',
			joinedAt: undefined,
			salary: 0,
			overtimeSalary: 0,
			fullname: '',
			birthDate: undefined,
			lastEducation: '',
			photoUrl: undefined,
		},
	})
	const photoWatch = form.watch('photoUrl')

	useEffect(() => {
		if (data) {
			form.reset({
				position: data.position,
				joinedAt: data.joinedAt ? new Date(data.joinedAt) : undefined,
				salary: data.salary,
				overtimeSalary: data.overtimeSalary,
				payType: data.payType,
				fullname: data.fullname,
				birthDate: data.birthDate ? new Date(data.birthDate) : undefined,
				safetyInductionDate: data.safetyInductionDate
					? new Date(data.safetyInductionDate)
					: undefined,
				lastEducation: data.lastEducation,
				photoUrl: data.photoUrl,
				nik: data.nik,
				address: data.address,
				phone: data.phone,
			})
		}
	}, [data])

	const submit = (payload: Partial<EmployeeForm>) => {
		mutate(
			{ ...payload, id },
			{
				onSuccess: handleFormSuccess(setOpen),
				onError: handleFormError<Partial<EmployeeForm>>(form),
			}
		)
	}

	const formVariant = {
		position: (
			<>
				<FormField
					control={form.control}
					name='position'
					render={({ field }) => (
						<FormItem className='flex flex-col'>
							<FormLabel>Jabatan</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='joinedAt'
					render={({ field }) => (
						<FormItem className='flex flex-col'>
							<FormLabel>Tanggal bergabung</FormLabel>
							<FormControl>
								<Input
									onChange={field.onChange}
									className='block'
									type='date'
									value={
										field.value
											? new Date(field.value).toISOString().split('T')[0]
											: undefined
									}
								/>
							</FormControl>
						</FormItem>
					)}
				/>

				<ProtectedComponent required={[permissions.employee_read_salary]}>
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
				</ProtectedComponent>
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
			</>
		),
		info: (
			<>
				<FormItem className='flex flex-col'>
					<FormLabel>Foto</FormLabel>
					<ImageUpload
						value={photoWatch}
						onChange={(e) => form.setValue('photoUrl', e)}
					/>
				</FormItem>
				<FormField
					control={form.control}
					name='fullname'
					render={({ field }) => (
						<FormItem className='flex flex-col'>
							<FormLabel>Nama lengkap</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='nik'
					render={({ field }) => (
						<FormItem className='flex flex-col'>
							<FormLabel>NIK</FormLabel>
							<FormControl>
								<Input {...field} />
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
								<Select value={field.value} onValueChange={field.onChange}>
									<SelectTrigger className='bg-surface-secondary uppercase'>
										<SelectValue placeholder='Pend. Terakhir' />
									</SelectTrigger>
									<SelectContent>
										{educationOption.map((i, index) => (
											<SelectItem
												key={index}
												value={i.value}
												className='uppercase'
											>
												{i.label}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</FormControl>
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='birthDate'
					render={({ field }) => (
						<FormItem className='flex flex-col'>
							<FormLabel>Tanggal lahir</FormLabel>
							<FormControl>
								<Input
									onChange={field.onChange}
									className='block'
									type='date'
									value={
										field.value
											? new Date(field.value).toISOString().split('T')[0]
											: ''
									}
								/>
							</FormControl>
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='joinedAt'
					render={({ field }) => (
						<FormItem className='flex flex-col'>
							<FormLabel>Tanggal bergabung</FormLabel>
							<FormControl>
								<Input
									onChange={field.onChange}
									className='block'
									type='date'
									value={
										field.value
											? new Date(field.value).toISOString().split('T')[0]
											: ''
									}
								/>
							</FormControl>
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='safetyInductionDate'
					render={({ field }) => (
						<FormItem className='flex flex-col'>
							<FormLabel>Tanggal safety induction</FormLabel>
							<FormControl>
								<Input
									onChange={field.onChange}
									className='block'
									type='date'
									value={
										field.value
											? new Date(field.value).toISOString().split('T')[0]
											: ''
									}
								/>
							</FormControl>
						</FormItem>
					)}
				/>
			</>
		),
		address: (
			<>
				<FormField
					control={form.control}
					name='phone'
					render={({ field }) => (
						<FormItem className='flex flex-col'>
							<FormLabel>Nomor telepon</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='address'
					render={({ field }) => (
						<FormItem className='flex flex-col'>
							<FormLabel>Alamat</FormLabel>
							<FormControl>
								<Textarea
									{...field}
									className='bg-surface-secondary w-full mt-2 md:mt-0 shadow-none'
								>
									Alamat
								</Textarea>
							</FormControl>
						</FormItem>
					)}
				/>
			</>
		),
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button variant='outline' className='gap-2'>
					<Pencil size={16} />
					<span className='px-0.5'>Edit</span>
				</Button>
			</DialogTrigger>
			<DialogContent className='p-6'>
				<DialogTitle>Jabatan</DialogTitle>
				<DialogDescription>
					Pastikan semua data yang dimasukkan sudah benar sebelum disimpan.
				</DialogDescription>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(submit)}
						className='flex gap-4 flex-col pt-4'
					>
						{formVariant[variant]}
						<DialogFooter>
							<div className='flex justify-end gap-4 items-center pt-4'>
								<DialogClose asChild>
									<Button variant='outline' type='button'>
										Batal
									</Button>
								</DialogClose>
								<ButtonSubmit isPending={isPending} />
							</div>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	)
}

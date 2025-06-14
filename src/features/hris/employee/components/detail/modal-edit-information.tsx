import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Pencil } from 'lucide-react'

import { handleFormError, handleFormSuccess } from '@/shared/utils/form'
import { ImageUpload } from '@/shared/components/common/image-upload'
import ButtonSubmit from '@/shared/components/common/button-submit'
import { Button } from '@/shared/components/ui/button'
import { Input } from '@/shared/components/ui/input'
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

import { useDestroyPhotoEmployee } from '../../api/use-destroy-photo-employee'
import { useUpdateEmployee } from '../../api/use-update-employee'
import { useEmployee } from '../../api/use-employee'
import { EmployeeForm } from '../../types'

export default function ModalEditInformation() {
	const { id } = useParams()

	const { mutate: destroyPhoto } = useDestroyPhotoEmployee()
	const { data, isPending } = useEmployee(id)
	const { mutate } = useUpdateEmployee()

	const [open, setOpen] = useState(false)
	const form = useForm<Partial<EmployeeForm>>({
		defaultValues: {
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
				fullname: data.fullname,
				birthDate: data.birthDate ? new Date(data.birthDate) : undefined,
				joinedAt: data.birthDate ? new Date(data.joinedAt) : undefined,
				safetyInductionDate: data.safetyInductionDate
					? new Date(data.safetyInductionDate)
					: undefined,
				lastEducation: data.lastEducation,
				photoUrl: data.photoUrl,
			})
		}
	}, [data])

	const submit = (payload: Partial<EmployeeForm>) => {
		if (!id) return
		if (payload.photoUrl === null) {
			destroyPhoto({ id })
		}
		const data = payload
		if (typeof data.photoUrl === 'string') {
			delete data.photoUrl
		}

		mutate(
			{ ...data, id },
			{
				onSuccess: handleFormSuccess(setOpen),
				onError: handleFormError<Partial<EmployeeForm>>(form),
			}
		)
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
				<DialogTitle>Informasi pegawai</DialogTitle>
				<DialogDescription>
					Pastikan semua data yang dimasukkan sudah benar sebelum disimpan.
				</DialogDescription>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(submit)}
						className='flex gap-4 flex-col pt-4'
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
												{['sd', 'smp', 'sma', 's1', 's2', 's3'].map(
													(i, index) => (
														<SelectItem
															key={index}
															value={i}
															className='uppercase'
														>
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

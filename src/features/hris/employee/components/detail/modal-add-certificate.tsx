import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Loader, Plus } from 'lucide-react'
import { useForm } from 'react-hook-form'

import { DatePickerField } from '@/shared/components/fields/data-picker-fields'
import { handleFormError, handleFormSuccess } from '@/shared/utils/form'
import FileUpload from '@/shared/components/common/file-upload'
import { Button } from '@/shared/components/ui/button'
import { Input } from '@/shared/components/ui/input'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
} from '@/shared/components/ui/form'
import {
	Dialog,
	DialogTitle,
	DialogTrigger,
	DialogContent,
	DialogDescription,
	DialogClose,
	DialogFooter,
} from '@/shared/components/ui/dialog'

import { useCreateCertificate } from '../../api/use-create-certificate'
import { CertificateForm } from '../../types'

export default function ModalAddCertificate() {
	const { mutate, isPending } = useCreateCertificate()
	const { id } = useParams()

	const [open, setOpen] = useState(false)

	const form = useForm<CertificateForm>({
		defaultValues: {
			file: undefined,
			name: '',
			employeeId: id,
			expiryDate: undefined,
			issueDate: undefined,
			publisher: '',
		},
	})

	const fileWatch = form.watch('file')

	useEffect(() => {
		if (fileWatch) {
			form.setValue('name', fileWatch.name)
		}
	}, [fileWatch])

	const submit = (payload: CertificateForm) => {
		mutate(payload, {
			onSuccess: handleFormSuccess(setOpen, () => {
				form.reset({
					name: '',
					employeeId: id,
					expiryDate: undefined,
					issueDate: undefined,
					publisher: '',
				})
			}),
			onError: handleFormError<CertificateForm>(form),
		})
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button className='gap-1'>
					<Plus strokeWidth={2} size={16} className='text-white' />
					<span className='px-0.5 flex gap-1'>
						Tambah <span className='hidden md:block'>Sertifikasi</span>
					</span>
				</Button>
			</DialogTrigger>
			<DialogContent className='p-6'>
				<DialogTitle className='text-center'>Sertifikat Baru</DialogTitle>
				<DialogDescription>
					Pastikan semua data yang dimasukkan sudah benar sebelum disimpan.
				</DialogDescription>
				<Form {...form}>
					<form
						className='flex gap-4 flex-col pt-4'
						onSubmit={form.handleSubmit(submit)}
					>
						<FormField
							control={form.control}
							name='file'
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<FileUpload onChange={field.onChange} />
									</FormControl>
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='name'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Nama</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='publisher'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Organisasi Penerbit</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
								</FormItem>
							)}
						/>

						<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
							<FormField
								control={form.control}
								name='issueDate'
								render={({ field }) => (
									<FormItem className='flex flex-col'>
										<FormLabel>Tanggal terbit</FormLabel>
										<FormControl>
											<DatePickerField
												value={field.value}
												onChange={field.onChange}
												disabledDate={(date) => date < new Date('1900-01-01')}
											/>
										</FormControl>
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='expiryDate'
								render={({ field }) => (
									<FormItem className='flex flex-col'>
										<FormLabel>Tanggal kadaluwarsa</FormLabel>
										<FormControl>
											<DatePickerField
												value={field.value}
												onChange={field.onChange}
												disabledDate={(date) => date < new Date('1900-01-01')}
											/>
										</FormControl>
									</FormItem>
								)}
							/>
						</div>

						<DialogFooter>
							<div className='flex justify-end gap-4 items-center pt-4'>
								<DialogClose asChild>
									<Button variant='outline' type='button'>
										Batal
									</Button>
								</DialogClose>
								<Button disabled={isPending}>
									{isPending ? (
										<>
											<Loader className='mr-2 h-4 w-4 animate-spin' />
											Menyimpan...
										</>
									) : (
										'Simpan'
									)}
								</Button>
							</div>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	)
}

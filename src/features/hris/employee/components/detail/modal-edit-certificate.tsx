import { Loader, Pencil } from 'lucide-react'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useAtomValue } from 'jotai'

import { DatePickerField } from '@/shared/components/fields/data-picker-fields'
import { handleFormError, handleFormSuccess } from '@/shared/utils/form'
import FileUpload from '@/shared/components/common/file-upload'
import { Button } from '@/shared/components/ui/button'
import { Input } from '@/shared/components/ui/input'
import { convertUTCToWIB } from '@/shared/utils'
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

import { useUpdateCertificate } from '../../api/use-update-certificate'
import { useCertificate } from '../../api/use-certificate'
import { CertificateForm } from '../../types'

export default function ModalEditCertificate({ id }: { id?: string }) {
	const { id: employeeId } = useParams()

	const [open, setOpen] = useState(false)

	const { mutate, isPending } = useUpdateCertificate()
	const { data } = useCertificate(id)

	const form = useForm<Partial<CertificateForm>>({
		defaultValues: {
			expiryDate: undefined,
			issueDate: undefined,
			file: undefined,
			name: '',
			publisher: '',
		},
	})

	useEffect(() => {
		if (data) {
			form.reset({
				name: data.name,
				publisher: data.publisher,
				expiryDate: convertUTCToWIB(new Date(data.expiryDate)),
				issueDate: convertUTCToWIB(new Date(data.issueDate)),
			})
		}
	}, [data])

	const submit = async (payload: Partial<CertificateForm>) => {
		mutate(
			{ ...payload, id, employeeId },
			{
				onSuccess: handleFormSuccess(setOpen),
				onError: handleFormError<Partial<CertificateForm>>(form),
			}
		)
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button variant='outline' className='gap-1'>
					<Pencil size={18} className='text-ink-light' />
					<span className='px-0.5'>Edit</span>
				</Button>
			</DialogTrigger>
			<DialogContent className='p-6'>
				<DialogTitle>Edit</DialogTitle>
				<DialogDescription>
					Pastikan semua data yang dimasukkan sudah benar sebelum disimpan.
				</DialogDescription>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(submit)}
						className='flex gap-4 flex-col pt-4'
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
										'Perbarui'
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

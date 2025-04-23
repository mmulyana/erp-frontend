import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Plus } from 'lucide-react'

import { handleFormError, handleFormSuccess } from '@/shared/utils/form'
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
	FormMessage,
} from '@/shared/components/ui/form'
import { useCreateCompany } from '../api/use-create-company'
import { CompanyForm } from '../types'
import { Textarea } from '@/shared/components/ui/textarea'
import { ImageUpload } from '@/shared/components/common/image-upload'

export default function ModalAddCompany() {
	const [open, setOpen] = useState(false)

	const defaultValues: CompanyForm = {
		name: '',
		email: '',
		phone: '',
		address: '',
		photoUrl: null,
	}

	const { mutate, isPending } = useCreateCompany()

	const form = useForm<CompanyForm>({
		defaultValues,
	})
	const photoWatch = form.watch('photoUrl')

	const submit = (payload: CompanyForm) => {
		mutate(payload, {
			onSuccess: handleFormSuccess(setOpen),
			onError: handleFormError<CompanyForm>(form),
		})
	}

	useEffect(() => {
		if (!open) {
			form.reset(defaultValues)
		}
	}, [open])

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button className='gap-2'>
					<Plus strokeWidth={2} size={16} className='text-white' />
					<span className='px-0.5'>Tambah Perusahaan</span>
				</Button>
			</DialogTrigger>
			<DialogContent className='p-6'>
				<DialogTitle>Perusahaan Baru</DialogTitle>
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
							name='name'
							render={({ field }) => (
								<FormItem className='flex flex-col'>
									<FormLabel>Nama</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='email'
							render={({ field }) => (
								<FormItem className='flex flex-col'>
									<FormLabel>Email</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='phone'
							render={({ field }) => (
								<FormItem className='flex flex-col'>
									<FormLabel>Nomor telepon</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
									<FormMessage />
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
										<Textarea {...field} />
									</FormControl>
									<FormMessage />
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

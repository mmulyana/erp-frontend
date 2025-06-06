import { useForm } from 'react-hook-form'
import { useState } from 'react'

import ButtonSubmit from '@/shared/components/common/button-submit'
import { handleFormError, handleFormSuccess } from '@/shared/utils/form'
import { ImageUpload } from '@/shared/components/common/image-upload'
import { Textarea } from '@/shared/components/ui/textarea'
import { Button } from '@/shared/components/ui/button'
import { Input } from '@/shared/components/ui/input'
import {
	Dialog,
	DialogClose,
	DialogTitle,
	DialogFooter,
	DialogContent,
	DialogDescription,
	DialogHeader,
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

import { useCreateSupplier } from '../api/use-create-supplier'
import { SupplierForm } from '../types'
import { Plus } from 'lucide-react'

export default function ModalAddSupplier() {
	const [open, setOpen] = useState(false)

	const defaultValues = {
		name: '',
		address: '',
		email: '',
		googleMapUrl: '',
		phone: '',
		photoUrl: null,
	}

	const { mutate, isPending } = useCreateSupplier()

	const form = useForm<SupplierForm>({
		defaultValues,
	})
	const photoWatch = form.watch('photoUrl')

	const submit = (payload: SupplierForm) => {
		mutate(payload, {
			onSuccess: handleFormSuccess(setOpen, () => {
				form.reset()
			}),
			onError: handleFormError(form),
		})
	}

	return (
		<>
			<Dialog open={open} onOpenChange={setOpen}>
				<DialogTrigger asChild>
					<Button>
						<Plus size={20} className='text-white'/>
						<span className='px-0.5'>Tambah</span>
					</Button>
				</DialogTrigger>
				<DialogContent className='p-6'>
					<DialogHeader>
						<DialogTitle className='text-center'>Supplier Baru</DialogTitle>
						<DialogDescription className='text-center'>
							Pastikan semua data yang dimasukkan sudah benar sebelum disimpan.
						</DialogDescription>
					</DialogHeader>

					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(submit)}
							className='flex flex-col gap-4 pt-4'
						>
							<FormField
								name='photoUrl'
								control={form.control}
								render={({ field }) => (
									<FormItem className='flex flex-col'>
										<FormControl>
											<ImageUpload
												value={photoWatch}
												onChange={(e) => field.onChange(e)}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								name='name'
								control={form.control}
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
							<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
								<FormField
									name='email'
									control={form.control}
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
									name='phone'
									control={form.control}
									render={({ field }) => (
										<FormItem className='flex flex-col'>
											<FormLabel>No. Telp</FormLabel>
											<FormControl>
												<Input {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
							<FormField
								name='address'
								control={form.control}
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
							<FormField
								name='googleMapUrl'
								control={form.control}
								render={({ field }) => (
									<FormItem className='flex flex-col'>
										<FormLabel>Link google map</FormLabel>
										<div className='flex rounded-md shadow-xs'>
											<span className='bg-surface border-input bg-background text-muted-foreground -z-10 inline-flex items-center rounded-s-md border px-3 text-sm'>
												https://
											</span>
											<FormControl>
												<Input
													className='-ms-px rounded-s-none shadow-none'
													placeholder='google.com'
													type='text'
													{...field}
												/>
											</FormControl>
										</div>
										<FormMessage />
									</FormItem>
								)}
							/>

							<DialogFooter className='flex justify-between w-full pt-4'>
								<div className='flex gap-2 ml-auto'>
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
		</>
	)
}

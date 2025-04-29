import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { atom, useAtom } from 'jotai'
import { Loader } from 'lucide-react'

import { handleFormError, handleFormSuccess } from '@/shared/utils/form'
import { ImageUpload } from '@/shared/components/common/image-upload'
import { Textarea } from '@/shared/components/ui/textarea'
import { Button } from '@/shared/components/ui/button'
import { Input } from '@/shared/components/ui/input'
import { paths } from '@/shared/constants/paths'
import {
	Dialog,
	DialogClose,
	DialogTitle,
	DialogFooter,
	DialogContent,
	DialogDescription,
} from '@/shared/components/ui/dialog'
import {
	AlertDialog,
	AlertDialogTitle,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogContent,
	AlertDialogDescription,
} from '@/shared/components/ui/alert-dialog'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/shared/components/ui/form'

import { useCreateSupplier } from '../api/use-create-supplier'
import { useUpdateSupplier } from '../api/use-update-supplier'
import { useDeleteSupplier } from '../api/use-delete-supplier'
import { useSupplier } from '../api/use-supplier'
import { SupplierForm } from '../types'

export const atomModalSupplier = atom<{ id: string; open: boolean } | null>(
	null
)
export default function ModalSupplier() {
	const [modal, setModal] = useAtom(atomModalSupplier)
	const [openDelete, setOpenDelete] = useState(false)
	const navigate = useNavigate()

	const defaultValues = {
		name: '',
		address: '',
		email: '',
		googleMapUrl: '',
		phone: '',
		photoUrl: null,
	}

	const { data } = useSupplier({ id: modal?.id })

	const { mutate: createLocation, isPending: isCreating } = useCreateSupplier()
	const { mutate: updateLocation, isPending: isUpdating } = useUpdateSupplier()
	const { mutate: deleteLocation } = useDeleteSupplier()

	const form = useForm<SupplierForm>({
		defaultValues,
	})
	const photoWatch = form.watch('photoUrl')

	const isEdit = !!modal?.id

	const submit = (payload: SupplierForm) => {
		if (isEdit && modal?.id) {
			updateLocation(
				{ ...payload, id: modal.id },
				{
					onSuccess: handleFormSuccess(() => setModal(null)),
					onError: handleFormError<SupplierForm>(form),
				}
			)
		} else {
			createLocation(payload, {
				onSuccess: handleFormSuccess(() => setModal(null)),
				onError: handleFormError<SupplierForm>(form),
			})
		}
	}

	const handleDelete = () => {
		if (modal?.id) {
			deleteLocation(
				{ id: modal.id },
				{
					onSuccess: () => {
						setModal(null)
						navigate(paths.inventoryMasterdataSupplier, { replace: true })
					},
				}
			)
		}
	}

	useEffect(() => {
		if (data && isEdit && modal.open) {
			form.reset({
				photoUrl: data.data?.photoUrl ?? null,
				name: data.data?.name,
				address: data.data?.address || '',
				phone: data.data?.phone || '',
				email: data.data?.email || '',
				googleMapUrl: data.data?.googleMapUrl || '',
			})
		}
	}, [data, isEdit, modal?.open])

	useEffect(() => {
		if (!modal?.open) {
			form.reset(defaultValues)
		}
	}, [modal?.open])

	const isSubmitting = isCreating || isUpdating

	if (!modal) return null

	return (
		<>
			<Dialog
				open={modal.open}
				onOpenChange={(open) => setModal(modal ? { ...modal, open } : null)}
			>
				<DialogContent className='p-6'>
					<DialogTitle>
						{isEdit ? 'Edit Supplier' : 'Supplier Baru'}
					</DialogTitle>
					<DialogDescription>
						{isEdit
							? 'Perbarui informasi supplier.'
							: 'Masukkan informasi supplier baru.'}
					</DialogDescription>

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
								{isEdit && (
									<Button
										variant='ghost'
										className='text-error hover:bg-error hover:text-white px-2.5 mr-auto'
										type='button'
										onClick={() => setOpenDelete(true)}
									>
										Hapus Supplier
									</Button>
								)}

								<div className='flex gap-2 ml-auto'>
									<DialogClose asChild>
										<Button variant='outline' type='button'>
											Batal
										</Button>
									</DialogClose>
									<Button disabled={isSubmitting}>
										{isSubmitting ? (
											<>
												<Loader className='mr-2 h-4 w-4 animate-spin' />
												Menyimpan...
											</>
										) : isEdit ? (
											'Perbarui'
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

			<AlertDialog open={openDelete} onOpenChange={setOpenDelete}>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Hapus Supplier?</AlertDialogTitle>
						<AlertDialogDescription>
							Tindakan ini tidak dapat dibatalkan. Hubungi admin jika tidak
							sengaja terhapus.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>Batal</AlertDialogCancel>
						<AlertDialogAction className='bg-error' onClick={handleDelete}>
							Hapus
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</>
	)
}

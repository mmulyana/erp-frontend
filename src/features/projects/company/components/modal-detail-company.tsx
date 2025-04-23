import { useForm } from 'react-hook-form'
import { atom, useAtom } from 'jotai'
import { useEffect } from 'react'

import { handleFormError, handleFormSuccess } from '@/shared/utils/form'
import { ImageUpload } from '@/shared/components/common/image-upload'
import ButtonSubmit from '@/shared/components/common/button-submit'
import { Textarea } from '@/shared/components/ui/textarea'
import { Button } from '@/shared/components/ui/button'
import { Input } from '@/shared/components/ui/input'
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogTitle,
} from '@/shared/components/ui/dialog'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/shared/components/ui/form'

import { useDestroyPhotoCompany } from '../api/use-destroy-photo-company'
import { useUpdateCompany } from '../api/use-update-company'
import ModalDeleteCompany from './modal-delete-company'
import { useCompany } from '../api/use-company'
import { CompanyForm } from '../types'

export const atomModalCompany = atom<{ id: string; open: boolean } | null>(null)
export default function ModalDetailCompany() {
	const [modal, setModal] = useAtom(atomModalCompany)

	const defaultValues: CompanyForm = {
		name: '',
		email: '',
		phone: '',
		address: '',
		photoUrl: null,
	}

	const { data } = useCompany({ id: modal?.id })
	const { mutate, isPending } = useUpdateCompany()
	const { mutate: destroyPhoto } = useDestroyPhotoCompany()

	const form = useForm<CompanyForm>({
		defaultValues,
	})
	const photoWatch = form.watch('photoUrl')

	const onClose = () => setModal(null)

	const submit = (payload: CompanyForm) => {
		if (!modal?.id) return

		if (payload.photoUrl === null) {
			destroyPhoto({ id: modal?.id })
		}
		const data = payload
		if (typeof data.photoUrl === 'string') {
			delete data.photoUrl
		}

		mutate(
			{ ...data, id: modal?.id },
			{
				onSuccess: handleFormSuccess(onClose),
				onError: handleFormError<CompanyForm>(form),
			}
		)
	}

	useEffect(() => {
		if (data) {
			form.reset({
				address: data.data?.address,
				email: data.data?.email,
				name: data.data?.name,
				phone: data.data?.phone,
				photoUrl: data.data?.photoUrl,
			})
		}
	}, [data])

	useEffect(() => {
		if (!open) {
			form.reset(defaultValues)
		}
	}, [open])

	return (
		<Dialog
			open={modal?.open}
			onOpenChange={(open) => {
				if (modal) {
					setModal({ ...modal, open })
				}
			}}
		>
			<DialogContent className='p-6'>
				<DialogTitle>Perusahaan</DialogTitle>
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
							<div className='flex justify-between w-full pt-4'>
								<ModalDeleteCompany />
								<div className='flex justify-end gap-4 items-center'>
									<DialogClose asChild>
										<Button variant='outline' type='button'>
											Batal
										</Button>
									</DialogClose>
									<ButtonSubmit isPending={isPending} title='Perbarui' />
								</div>
							</div>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	)
}

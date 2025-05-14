import { useForm } from 'react-hook-form'
import { atom, useAtom } from 'jotai'
import { useEffect, useState } from 'react'

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
} from '@/shared/components/ui/dialog'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/shared/components/ui/form'

import { useDestroyPhotoBrand } from '../api/use-destroy-photo-brand'
import { useUpdateBrand } from '../api/use-update-brand'
import ModalDeleteBrand from './modal-delete-brand'
import { useBrand } from '../api/use-brand'

type Form = {
	name: string
	photoUrl?: File | string | null
}
type props = {
	id?: string
}
export default function ModalDetailBrand({ id }: props) {
	const [open, setOpen] = useState(false)
	const { data } = useBrand({ id })
	const { mutate, isPending } = useUpdateBrand()
	const { mutate: destroyPhoto } = useDestroyPhotoBrand()

	const form = useForm<Form>({
		defaultValues: {
			name: '',
			photoUrl: undefined,
		},
	})
	const photoWatch = form.watch('photoUrl')

	const onClose = () => {
		form.reset()
		setOpen(false)
	}

	const submit = (payload: Form) => {
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
				onSuccess: handleFormSuccess(onClose),
				onError: handleFormError<Form>(form),
			}
		)
	}

	useEffect(() => {
		if (data) {
			form.reset({
				name: data.data?.name,
				photoUrl: data.data?.photoUrl,
			})
		}
	}, [data])

	useEffect(() => {
		if (!open) {
			form.reset({
				name: '',
				photoUrl: undefined,
			})
		}
	}, [open])

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogContent className='p-6'>
				<DialogTitle>Merek</DialogTitle>
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

						<DialogFooter>
							<div className='flex justify-between w-full pt-4'>
								<ModalDeleteBrand id={id} setOpen={setOpen} />
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

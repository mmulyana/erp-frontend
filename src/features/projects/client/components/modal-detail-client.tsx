import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { atom, useAtom } from 'jotai'

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
} from '@/shared/components/ui/dialog'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/shared/components/ui/form'

import { useUpdateClient } from '../api/use-update-client'
import ModalDeleteClient from './modal-delete-client'
import { useClient } from '../api/use-client'
import { ClientForm } from '../types'

export const atomModalClient = atom<{ open: boolean; id: string } | null>(null)
export default function ModalDetailClient() {
	const [modal, setModal] = useAtom(atomModalClient)

	const defaultValues = {
		name: '',
		email: '',
		phone: '',
		companyId: null,
		position: '',
	}

	const { data } = useClient({ id: modal?.id })
	const { mutate, isPending } = useUpdateClient()

	const form = useForm<ClientForm>({
		defaultValues,
	})

	const onClose = () => setModal(null)

	const submit = (payload: ClientForm) => {
		if (!modal?.id) return

		mutate(
			{ ...payload, id: modal.id },
			{
				onSuccess: handleFormSuccess(onClose),
				onError: handleFormError<ClientForm>(form),
			}
		)
	}

	useEffect(() => {
		if (data) {
			form.reset({
				name: data.data?.name,
				companyId: data.data?.companyId,
				email: data.data?.email,
				phone: data.data?.phone,
				position: data.data?.position,
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
				<DialogTitle>Klien</DialogTitle>
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
							name='position'
							render={({ field }) => (
								<FormItem className='flex flex-col'>
									<FormLabel>Jabatan</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<DialogFooter>
							<div className='flex justify-between w-full pt-4'>
								<ModalDeleteClient />
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

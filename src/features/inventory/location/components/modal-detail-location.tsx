import { useForm } from 'react-hook-form'
import { Loader } from 'lucide-react'
import { atom, useAtom } from 'jotai'
import { useEffect } from 'react'

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

import { useUpdateLocation } from '../api/use-update-location'
import ModalDeleteLocation from './modal-delete-location'
import { useLocation } from '../api/use-location'

type Form = {
	name: string
}

export const atomModalLocation = atom<{ open: boolean; id: string } | null>(
	null
)
export default function ModalDetailLocation() {
	const [modal, setModal] = useAtom(atomModalLocation)

	const { data } = useLocation({ id: modal?.id })
	const { mutate, isPending } = useUpdateLocation()

	const form = useForm<Form>({
		defaultValues: {
			name: '',
		},
	})

	const onClose = () => setModal(null)

	const submit = (payload: Form) => {
		if (!modal?.id) return

		mutate(
			{ ...payload, id: modal.id },
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
			})
		}
	}, [data])

	useEffect(() => {
		if (!modal?.open) {
			form.reset({
				name: '',
			})
		}
	}, [modal?.open])

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
				<DialogTitle>Lokasi</DialogTitle>
				<DialogDescription>
					Pastikan semua data yang dimasukkan sudah benar sebelum disimpan.
				</DialogDescription>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(submit)}
						className='flex gap-4 flex-col pt-4'
					>
						<FormField
							name='name'
							control={form.control}
							render={({ field }) => (
								<FormItem className='flex flex-col'>
									<FormLabel>Nama lokasi</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<DialogFooter>
							<div className='flex justify-between w-full pt-4'>
								<ModalDeleteLocation />
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

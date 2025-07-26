import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'

import { handleFormError, handleFormSuccess } from '@/shared/utils/form'
import { Button } from '@/shared/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/shared/components/ui/dialog'

import FormReturnLoan from './form-return-loan'
import { useReturnLoan } from '../api/use-return-loan'
import { returnForm } from '../types'
import { useLoan } from '../api/use-loan'

export default function ModalReturnLoan({ id }: { id?: string }) {
	const [open, setOpen] = useState(false)

	const { data } = useLoan({ id })
	const { mutate, isPending } = useReturnLoan()
	const form = useForm<returnForm>()

	const submit = (data: returnForm) => {
		if (!id) return

		mutate(
			{ id, ...data },
			{
				onSuccess: handleFormSuccess(setOpen),
				onError: handleFormError(form),
			}
		)
	}

	useEffect(() => {
		if (data?.data) {
			const res = data.data
			form.reset({
				photoUrlOut: res.photoUrlOut,
				returnDate: res.returnDate && new Date(res.returnDate),
			})
		}
	}, [data])

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button
					variant='secondary'
					className='text-ink-primary px-3 bg-amber-400 hover:bg-amber-500'
				>
					Kembalikan
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle className='text-center'>Pengembalian</DialogTitle>
					<DialogDescription className='text-center'>
						Pastikan semua data yang dimasukkan sudah benar sebelum disimpan.
					</DialogDescription>
				</DialogHeader>
				<FormReturnLoan
					form={form}
					onSubmit={submit}
					isPending={isPending}
					returnedQty={data?.data?.returnedQuantity}
					requestQty={data?.data?.requestQuantity}
					measurement={data?.data?.item.unitOfMeasurement}
				/>
			</DialogContent>
		</Dialog>
	)
}

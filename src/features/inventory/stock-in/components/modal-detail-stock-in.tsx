import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Pencil } from 'lucide-react'

import { handleFormError, handleFormSuccess } from '@/shared/utils/form'
import { Button } from '@/shared/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogTrigger,
} from '@/shared/components/ui/dialog'

import FormStockIn from './form-stock-in'
import { useUpdateStockIn } from '../api/use-update-stock-in'
import { useStockIn } from '../api/use-stock-in'
import { StockInForm } from '../type'

export default function ModalDetailStockIn() {
	const [open, setOpen] = useState(false)
	const { id } = useParams()

	const { data } = useStockIn({ id })
	const { mutate, isPending } = useUpdateStockIn()

	const form = useForm<StockInForm>()

	useEffect(() => {
		if (data?.data) {
			const res = data.data
			form.reset({
				date: new Date(res.date),
				note: res.note,
				photoUrl: res.photoUrl,
				referenceNumber: res.referenceNumber,
				supplierId: res.supplierId,
			})
		}
	}, [data])

	const submit = (payload: StockInForm) => {
		if (!id) return

		mutate(
			{
				id,
				date: payload.date,
				note: payload.note,
				photoUrl: payload.photoUrl,
				referenceNumber: payload.referenceNumber,
				supplierId: payload.supplierId,
			},
			{
				onSuccess: handleFormSuccess(setOpen),
				onError: handleFormError(form),
			}
		)
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button variant='outline'>
					<Pencil size={16} />
					<span className='px-0.5'>Edit</span>
				</Button>
			</DialogTrigger>
			<DialogContent>
				<FormStockIn
					variant='edit'
					form={form}
					onSubmit={submit}
					isPending={isPending}
				/>
			</DialogContent>
		</Dialog>
	)
}

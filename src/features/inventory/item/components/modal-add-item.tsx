import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Plus } from 'lucide-react'

import { handleFormError, handleFormSuccess } from '@/shared/utils/form'
import { Button } from '@/shared/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogTitle,
	DialogTrigger,
} from '@/shared/components/ui/dialog'
import { Form } from '@/shared/components/ui/form'

import { useCreateItem } from '../api/use-create-item'
import { ItemForm } from '../types'
import FormItem from './form-items'

type Form = {
	name: string
	photoUrl?: File | string | null
}

export default function ModalAddItem({ type }: { type?: string }) {
	const [open, setOpen] = useState(false)

	const defaultValues = {
		name: '',
		photoUrl: undefined,
		brandId: null,
		category: '',
		warehouseId: null,
		description: '',
		minimum: 1,
		unitOfMeasurement: '',
	}

	const { mutate, isPending } = useCreateItem()

	const form = useForm<ItemForm>({
		defaultValues,
	})

	const onSubmit = (payload: ItemForm) => {
		mutate(
			{ ...payload, type },
			{
				onSuccess: handleFormSuccess(setOpen),
				onError: handleFormError<Form>(form),
			}
		)
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
					<span className='px-0.5'>Tambah</span>
				</Button>
			</DialogTrigger>
			<DialogContent className='p-6'>
				<DialogTitle>Buat baru</DialogTitle>
				<DialogDescription>
					Pastikan semua data yang dimasukkan sudah benar sebelum disimpan.
				</DialogDescription>
				<FormItem form={form} onSubmit={onSubmit} isPending={isPending} />
			</DialogContent>
		</Dialog>
	)
}

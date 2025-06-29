import { NumericFormat } from 'react-number-format'
import { Pencil, Plus } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'

import ButtonSubmit from '@/shared/components/common/button-submit'
import { DatePickerField } from '@/shared/components/fields/data-picker-fields'
import { handleFormError, handleFormSuccess } from '@/shared/utils/form'
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

import { CashAdvanceForm } from '../types'
import { useCreateTransaction } from '../api/use-create-transaction'
import { useParams } from 'react-router-dom'
import { useUpdateTransaction } from '../api/use-update-transaction'
import { useQueryClient } from '@tanstack/react-query'
import { keys } from '@/shared/constants/keys'
import ModalDeleteTransaction from './modal-delete-transaction'

export default function ModalEditTransaction({
	data,
}: {
	data?: {
		date: string
		amount: number
		note?: string
		id: string
		cashAdvanceId: string
	}
}) {
	const queryClient = useQueryClient()
	const { id } = useParams()
	const [open, setOpen] = useState(false)

	const { mutate, isPending } = useUpdateTransaction()

	const onInvalidate = () => {
		queryClient.invalidateQueries({
			queryKey: [keys.cashAdvancesDetail, data.cashAdvanceId],
		})
		queryClient.invalidateQueries({
			queryKey: [keys.cashAdvanceTransactions, data.cashAdvanceId],
		})
	}

	const defaultValues = {
		amount: 0,
		date: undefined,
		employeeId: '',
		note: '',
	}

	const form = useForm<CashAdvanceForm>({
		defaultValues,
	})

	const onSubmit = (payload: CashAdvanceForm) => {
		if (!id) return
		mutate(
			{
				amount: payload.amount,
				date: data.date,
				note: payload.note,
				id: data.id,
				cashAdvanceId: data.cashAdvanceId,
			},
			{
				onSuccess: handleFormSuccess(setOpen, () => onInvalidate()),
				onError: handleFormError<CashAdvanceForm>(form),
			}
		)
	}

	useEffect(() => {
		if (open && data) {
			form.reset({
				amount: data.amount,
				date: new Date(data.date),
				note: data.note,
			})
		}

		if (!open) {
			form.reset(defaultValues)
		}
	}, [open])

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button variant='outline'>
					<Pencil size={16} />
					<span className='px-0.5'>Edit</span>
				</Button>
			</DialogTrigger>

			<DialogContent className='p-6'>
				<DialogTitle>Pembayaran Kasbon</DialogTitle>
				<DialogDescription>
					Pastikan semua data yang dimasukkan sudah benar sebelum disimpan.
				</DialogDescription>
				<Form {...form}>
					<form
						className='flex-1 flex flex-col gap-4 pt-4'
						onSubmit={form.handleSubmit(onSubmit)}
					>
						<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
							<FormField
								name='date'
								control={form.control}
								render={({ field }) => (
									<FormItem className='flex flex-col'>
										<FormLabel>Tanggal</FormLabel>
										<DatePickerField
											value={field.value}
											onChange={field.onChange}
										/>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								name='amount'
								control={form.control}
								render={({ field }) => {
									const usedField = { ...field }
									delete (usedField as any).onChange

									return (
										<FormItem>
											<FormLabel>Jumlah</FormLabel>
											<FormControl>
												<div className='relative'>
													<div className='absolute top-1/2 -translate-y-1/2 px-3 left-[1px] border-r border-border h-[calc(100%-2px)] flex justify-center items-center select-none text-sm text-ink-secondary font-medium'>
														Rp
													</div>
													<NumericFormat
														type='text'
														thousandSeparator='.'
														decimalSeparator=','
														customInput={Input}
														className='h-10 w-full pl-12'
														{...usedField}
														onValueChange={(values) => {
															field.onChange(Number(values.value))
														}}
													/>
												</div>
											</FormControl>
										</FormItem>
									)
								}}
							/>
						</div>
						<FormField
							name='note'
							control={form.control}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Keterangan</FormLabel>
									<FormControl>
										<Textarea className='bg-surface shadow-none' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<DialogFooter>
							<div className='flex justify-between items-center w-full pt-4'>
								<ModalDeleteTransaction
									id={data.id}
									callback={() => {
										onInvalidate()
										setOpen(false)
									}}
								/>
								<div className='flex justify-end gap-4 items-center'>
									<DialogClose asChild>
										<Button variant='outline' type='button'>
											Batal
										</Button>
									</DialogClose>
									<ButtonSubmit isPending={isPending} />
								</div>
							</div>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	)
}

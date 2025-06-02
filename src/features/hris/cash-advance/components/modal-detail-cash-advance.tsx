import { NumericFormat } from 'react-number-format'
import { useForm } from 'react-hook-form'
import { atom, useAtom } from 'jotai'
import { useEffect, useState } from 'react'

import { DatePickerField } from '@/shared/components/fields/data-picker-fields'
import EmployeeCombobox from '@/shared/components/combobox/employee-combobox'
import { handleFormError, handleFormSuccess } from '@/shared/utils/form'
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

import { useUpdateCashAdvance } from '../api/use-update-cash-advance'
import ModalDeleteCashAdvance from './modal-delete-cash-advace'
import { useCashAdvance } from '../api/use-cash-advance'
import { CashAdvanceForm } from '../types'
import { useParams } from 'react-router-dom'

export default function ModalDetailCashAdvance() {
	const [open, setOpen] = useState(false)

	const { id } = useParams()
	const { data } = useCashAdvance({ id: open ? id : '' })
	const { mutate, isPending } = useUpdateCashAdvance()

	const defaultValues = {
		amount: 0,
		date: new Date(),
		employeeId: '',
		note: '',
	}

	const form = useForm<CashAdvanceForm>({
		defaultValues,
	})

	useEffect(() => {
		if (data) {
			form.reset({
				amount: data.data?.amount,
				date: new Date(data.data?.date as string),
				employeeId: data.data?.employeeId,
				note: data.data?.note,
			})
		}
	}, [data])

	const onSubmit = async (data: CashAdvanceForm) => {
		mutate(
			{ ...data, id },
			{
				onSuccess: handleFormSuccess(setOpen),
				onError: handleFormError<CashAdvanceForm>(form),
			}
		)
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogContent className='p-6'>
				<DialogTitle>Detail Kasbon</DialogTitle>
				<DialogDescription>
					Pastikan semua data yang diperbarui sudah benar sebelum disimpan.
				</DialogDescription>
				<Form {...form}>
					<form
						className='flex-1 flex flex-col gap-4 pt-4'
						onSubmit={form.handleSubmit(onSubmit)}
					>
						<FormField
							name='employeeId'
							control={form.control}
							render={({ field }) => (
								<FormItem className='flex flex-col'>
									<FormLabel>Pegawai</FormLabel>
									<FormControl>
										<EmployeeCombobox
											onSelect={(e) => field.onChange(e)}
											defaultValue={field.value}
											disabled
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
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
							<div className='flex justify-between w-full pt-4'>
								<ModalDeleteCashAdvance />
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

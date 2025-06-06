import { UseFormReturn } from 'react-hook-form'
import EmployeeCombobox from '@/shared/components/combobox/employee-combobox'
import ButtonSubmit from '@/shared/components/common/button-submit'
import { DatePickerField } from '@/shared/components/fields/data-picker-fields'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/shared/components/ui/form'
import { DialogClose, DialogFooter } from '@/shared/components/ui/dialog'
import { Button } from '@/shared/components/ui/button'
import { AssignedForm } from '../../types'

type props = {
	form: UseFormReturn<AssignedForm>
	onSubmit: (data: AssignedForm) => void
	variant: 'add' | 'edit'
	isPending?: boolean
	modal?: React.ReactNode
}
export default function FormAssignedEmployee({
	form,
	onSubmit,
	variant,
	isPending = false,
	modal,
}: props) {
	const startDate = form.watch('startDate')

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='flex gap-4 flex-col pt-4'
			>
				{variant === 'add' && (
					<FormField
						control={form.control}
						name='employeeId'
						render={({ field }) => (
							<FormItem className='flex flex-col'>
								<FormLabel>Pegawai</FormLabel>
								<FormControl>
									<EmployeeCombobox onSelect={(e) => field.onChange(e)} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				)}
				<FormField
					control={form.control}
					name='startDate'
					render={({ field }) => (
						<FormItem className='flex flex-col'>
							<FormLabel>Tanggal Mulai</FormLabel>
							<FormControl>
								<DatePickerField
									value={field.value}
									onChange={field.onChange}
									disabledDate={(date) => {
										const today = new Date()

										const monthBfore = new Date(today)
										monthBfore.setMonth(monthBfore.getMonth() - 1)

										const monthAfter = new Date(today)
										monthAfter.setMonth(monthAfter.getMonth() + 1)

										return date < monthBfore || date > monthAfter
									}}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				{variant === 'edit' && (
					<FormField
						control={form.control}
						name='endDate'
						render={({ field }) => (
							<FormItem className='flex flex-col'>
								<FormLabel>Tanggal Berakhir</FormLabel>
								<FormControl>
									<DatePickerField
										value={field.value}
										onChange={field.onChange}
										disabledDate={(date) => {
											return date < new Date(startDate)
										}}
										showReset
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				)}

				<DialogFooter>
					<div className='flex justify-between gap-4 items-center pt-4 w-full'>
						<div>{modal}</div>
						<div className='flex gap-4'>
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
	)
}

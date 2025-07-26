import { UseFormReturn } from 'react-hook-form'

import ProjectCombobox from '@/features/projects/project/components/project-combobox'

import { DatePickerField } from '@/shared/components/fields/data-picker-fields'
import EmployeeCombobox from '@/shared/components/combobox/employee-combobox'
import { DialogClose, DialogFooter } from '@/shared/components/ui/dialog'
import ButtonSubmit from '@/shared/components/common/button-submit'
import { Textarea } from '@/shared/components/ui/textarea'
import { Button } from '@/shared/components/ui/button'
import { Input } from '@/shared/components/ui/input'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/shared/components/ui/form'

import { OvertimeForm } from '../../types'
import ProtectedComponent from '@/shared/components/common/protected'
import { permissions } from '@/shared/constants/permissions'
import ModalDeleteOvertime from './modal-delete-overtime'

export default function FormOvertime({
	form,
	onSubmit,
	isPending,
	id,
}: {
	form: UseFormReturn<OvertimeForm>
	onSubmit: (data: any) => void
	isPending: boolean
	id?: string
}) {
	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='flex gap-4 flex-col pt-4'
			>
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
									disabledDate={() => false}
								/>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						name='totalHour'
						control={form.control}
						render={({ field }) => (
							<FormItem className='flex flex-col'>
								<FormLabel>Jumlah jam</FormLabel>
								<FormControl>
									<Input {...field} type='number' />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<FormField
					name='note'
					control={form.control}
					render={({ field }) => (
						<FormItem className='flex flex-col'>
							<FormLabel>Keterangan</FormLabel>
							<FormControl>
								<Textarea {...field} className='bg-surface shadow-none' />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					name='projectId'
					control={form.control}
					render={({ field }) => (
						<FormItem className='flex flex-col'>
							<FormLabel>Proyek</FormLabel>
							<FormControl>
								<ProjectCombobox
									defaultValue={field.value}
									onSelect={field.onChange}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<DialogFooter>
					<div className='flex justify-end gap-4 items-center pt-4'>
						<div>
							<ProtectedComponent required={[permissions.overtime_delete]}>
								{id && <ModalDeleteOvertime id={id} />}
							</ProtectedComponent>
						</div>
						<DialogClose asChild>
							<Button variant='outline' type='button'>
								Batal
							</Button>
						</DialogClose>
						<ButtonSubmit isPending={isPending} />
					</div>
				</DialogFooter>
			</form>
		</Form>
	)
}

import { Loader } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { atom, useAtom } from 'jotai'
import { useEffect } from 'react'
import { toast } from 'sonner'

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

import { useUpdateOvertime } from '../../api/overtime/use-update-overtime'
import { useOvertime } from '../../api/overtime/use-overtime'
import ModalDeleteOvertime from './modal-delete-overtime'
import { OvertimeForm } from '../../types'
import ProtectedComponent from '@/shared/components/common/protected'
import { permissions } from '@/shared/constants/permissions'
import ProjectCombobox from '@/features/projects/project/components/project-combobox'

export default function ModalDetailOvertime({
	id,
	open,
	setOpen,
}: {
	id?: string
	open: boolean
	setOpen: (val: boolean) => void
}) {
	const defaultValues = {
		date: new Date(),
		employeeId: '',
		note: '',
		totalHour: 0,
	}

	const { data } = useOvertime({ id: open ? id : '' })
	const { mutate, isPending } = useUpdateOvertime()

	const form = useForm<OvertimeForm>({
		defaultValues,
	})

	useEffect(() => {
		if (data) {
			form.reset({
				totalHour: data.data?.totalHour,
				date: new Date(data.data?.date as string),
				employeeId: data.data?.employee.id,
				note: data.data?.note,
				projectId: data.data.projectId,
			})
		}
	}, [data])

	useEffect(() => {
		if (!open) {
			form.reset(defaultValues)
		}
	}, [open])

	const submit = (data: OvertimeForm) => {
		if (!id) {
			toast.error('Id tidak boleh kosong')
			return
		}
		mutate(
			{ ...data, totalHour: Number(data.totalHour), id: id },
			{
				onSuccess: handleFormSuccess(setOpen),
				onError: handleFormError<OvertimeForm>(form),
			}
		)
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogContent className='p-6'>
				<DialogTitle>Lembur</DialogTitle>
				<DialogDescription>
					Pastikan semua data yang diperbarui sudah benar sebelum disimpan.
				</DialogDescription>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(submit)}
						className='flex gap-4 flex-col pt-4'
					>
						<FormField
							control={form.control}
							name='employeeId'
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
							<div className='flex justify-between w-full pt-4'>
								<div>
									<ProtectedComponent required={[permissions.overtime_delete]}>
										<ModalDeleteOvertime
											id={id}
											onClose={() => setOpen(false)}
										/>
									</ProtectedComponent>
								</div>
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

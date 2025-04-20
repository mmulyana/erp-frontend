import { Loader } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { atom, useAtom } from 'jotai'
import { useEffect } from 'react'
import { toast } from 'sonner'

import { DatePickerField } from '@/shared/components/fields/data-picker-fields'
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
import EmployeeCombobox from '../../../_components/employee-combobox'
import { useOvertime } from '../../api/overtime/use-overtime'
import ModalDeleteOvertime from './modal-delete-overtime'
import { OvertimeForm } from '../../types'

export const ModalOvertime = atom<{ open: boolean; id: string } | null>(null)
export default function ModalDetailOvertime() {
	const [modal, setModal] = useAtom(ModalOvertime)

	const { data } = useOvertime({ id: modal?.id })

	const { mutate, isPending } = useUpdateOvertime()
	const form = useForm<OvertimeForm>({
		defaultValues: {
			date: new Date(),
			employeeId: '',
			note: '',
			totalHour: 0,
		},
	})

	useEffect(() => {
		if (data) {
			form.reset({
				totalHour: data.data?.totalHour,
				date: new Date(data.data?.date as string),
				employeeId: data.data?.employee.id,
				note: data.data?.note,
			})
		}
	}, [data])

	useEffect(() => {
		if (!modal?.open) {
			form.reset({
				date: new Date(),
				employeeId: '',
				note: '',
				totalHour: 0,
			})
		}
	}, [modal?.open])

	const submit = (data: OvertimeForm) => {
		if (!modal?.id) {
			toast.error('Id tidak boleh kosong')
			return
		}
		mutate(
			{ ...data, totalHour: Number(data.totalHour), id: modal?.id },
			{
				onSuccess: () => {
					setModal(null)
				},
				onError: (error: any) => {
					if (error?.response?.data?.errors) {
						error.response.data.errors.forEach((err: any) => {
							const field = err.path?.[0]
							const message = err.message
							if (field) {
								form.setError(field, { message })
							}
						})
					}
				},
			}
		)
	}

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
											style={{ value: 'bg-surface' }}
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
						<DialogFooter>
							<div className='flex justify-between w-full'>
								<ModalDeleteOvertime />
								<div className='flex justify-end gap-4 items-center'>
									<DialogClose asChild>
										<Button variant='outline' type='button'>
											Batal
										</Button>
									</DialogClose>
									<Button disabled={isPending}>
										{isPending ? (
											<>
												<Loader className='mr-2 h-4 w-4 animate-spin' />
												Menyimpan...
											</>
										) : (
											'Perbarui'
										)}
									</Button>
								</div>
							</div>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	)
}

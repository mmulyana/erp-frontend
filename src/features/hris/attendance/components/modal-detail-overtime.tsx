import { CalendarIcon, Loader } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { atom, useAtom } from 'jotai'
import { id } from 'date-fns/locale'
import { format } from 'date-fns'
import { useEffect } from 'react'
import { toast } from 'sonner'

import { Calendar } from '@/shared/components/ui/calendar'
import { Textarea } from '@/shared/components/ui/textarea'
import { Button } from '@/shared/components/ui/button'
import { Input } from '@/shared/components/ui/input'
import { cn } from '@/shared/utils/cn'
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
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/shared/components/ui/popover'

import EmployeeCombobox from '../../components/employee-combobox'
import ModalDeleteOvertime from './modal-delete-overtime'
import { useUpdateOvertime } from '../api/use-update-overtime'
import { useOvertime } from '../api/use-overtime'
import { OvertimeForm } from '../types'

export const ModalOvertime = atom<{ open: boolean; id: string } | null>(null)
export default function ModalDetailOvertime() {
	const [modal, setModal] = useAtom(ModalOvertime)

	const { data } = useOvertime({ id: modal?.id })
	// console.log('modal', modal)

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
										<Popover>
											<PopoverTrigger asChild>
												<FormControl>
													<Button
														variant={'outline'}
														className={cn(
															'h-10 bg-surface px-3 text-left font-normal',
															!field.value && 'text-muted-foreground'
														)}
													>
														{field.value ? (
															format(field.value, 'PPP', {
																locale: id,
															})
														) : (
															<span>Pilih tanggal</span>
														)}
														<CalendarIcon
															className='ml-auto'
															size={18}
															strokeWidth={2.5}
														/>
													</Button>
												</FormControl>
											</PopoverTrigger>
											<PopoverContent className='w-auto p-0' align='start'>
												<Calendar
													mode='single'
													selected={field.value}
													onSelect={field.onChange}
													disabled={(date) =>
														date > new Date() || date < new Date('1900-01-01')
													}
													initialFocus
												/>
											</PopoverContent>
										</Popover>
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

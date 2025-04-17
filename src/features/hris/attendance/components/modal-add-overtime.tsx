import { CalendarIcon, Loader, Plus } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { id } from 'date-fns/locale'
import { format } from 'date-fns'

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
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/shared/components/ui/popover'

import EmployeeCombobox from '../../components/employee-combobox'
import { useCreateOvertime } from '../api/use-create-overtime'
import { OvertimeForm } from '../types'

export default function ModalAddOvertime() {
	const [open, setOpen] = useState(false)

	const { mutate, isPending } = useCreateOvertime()
	const form = useForm<OvertimeForm>({
		defaultValues: {
			date: new Date(),
			employeeId: '',
			note: '',
			totalHour: 0,
		},
	})

	const submit = (data: OvertimeForm) => {
		mutate(
			{ ...data, totalHour: Number(data.totalHour) },
			{
				onSuccess: () => {
					setOpen(false)
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

	useEffect(() => {
		if (!open) {
			form.reset({
				date: new Date(),
				employeeId: '',
				note: '',
				totalHour: 0,
			})
		}
	}, [open])

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button className='gap-2'>
					<Plus strokeWidth={2} size={16} className='text-white' />
					<span className='px-0.5'>Tambah Lembur</span>
				</Button>
			</DialogTrigger>
			<DialogContent className='p-6'>
				<DialogTitle>Lembur</DialogTitle>
				<DialogDescription>
					Pastikan semua data yang dimasukkan sudah benar sebelum disimpan.
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
											<Input
												{...field}
												type='number'
												// onChange={(e) => field.onChange(Number(e.target.value))}
											/>
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
										'Simpan'
									)}
								</Button>
							</div>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	)
}

import { Loader, Pencil } from 'lucide-react'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import { DatePickerField } from '@/shared/components/fields/data-picker-fields'
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
} from '@/shared/components/ui/form'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/shared/components/ui/select'

import { useEmployee } from '../../api/use-employee'
import { EmployeeForm } from '../../types'
import { Textarea } from '@/shared/components/ui/textarea'
import { NumericFormat } from 'react-number-format'

export default function ModalEditPosition() {
	const { id } = useParams()
	const { data, isPending } = useEmployee(id)

	const [open, setOpen] = useState(false)
	const form = useForm<Partial<EmployeeForm>>({
		defaultValues: {
			position: '',
			joinedAt: undefined,
			salary: 0,
			overtimeSalary: 0,
		},
	})

	useEffect(() => {
		if (data) {
			form.reset({
				position: data.position,
				joinedAt: new Date(data.joinedAt),
				salary: data.salary,
				overtimeSalary: data.overtimeSalary,
			})
		}
	}, [data])

	const submit = (data: any) => {
		console.log('data', data)
	}

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant='outline' className='gap-2'>
					<Pencil size={16} />
					<span className='px-0.5'>Edit</span>
				</Button>
			</DialogTrigger>
			<DialogContent className='p-6'>
				<DialogTitle>Jabatan</DialogTitle>
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
							name='position'
							render={({ field }) => (
								<FormItem className='flex flex-col'>
									<FormLabel>Jabatan</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='joinedAt'
							render={({ field }) => (
								<FormItem className='flex flex-col'>
									<FormLabel>Tanggal bergabung</FormLabel>
									<FormControl>
										<DatePickerField
											value={field.value}
											onChange={field.onChange}
										/>
									</FormControl>
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name='salary'
							render={({ field }) => {
								const usedField = { ...field }
								delete (usedField as any).onChange

								return (
									<FormItem>
										<FormLabel>
											Gaji pokok{' '}
											<span className='text-ink-light'>(per hari)</span>
										</FormLabel>
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
						<FormField
							control={form.control}
							name='overtimeSalary'
							render={({ field }) => {
								const usedField = { ...field }
								delete (usedField as any).onChange

								return (
									<FormItem>
										<FormLabel>
											Gaji Lembur{' '}
											<span className='text-ink-light'>(per jam)</span>
										</FormLabel>
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
						<DialogFooter>
							<div className='flex justify-end gap-4 items-center pt-4'>
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

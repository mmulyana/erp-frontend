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

export default function ModalEditInformation() {
	const { id } = useParams()
	const { data, isPending } = useEmployee(id)

	const [open, setOpen] = useState(false)
	const form = useForm<Partial<EmployeeForm>>({
		defaultValues: {
			fullname: '',
			birthDate: undefined,
			lastEducation: '',
		},
	})

	useEffect(() => {
		if (data) {
			form.reset({
				fullname: data.fullname,
				birthDate: new Date(data.birthDate),
				lastEducation: data.lastEducation,
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
				<DialogTitle>Informasi pegawai</DialogTitle>
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
							name='fullname'
							render={({ field }) => (
								<FormItem className='flex flex-col'>
									<FormLabel>Nama lengkap</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='birthDate'
							render={({ field }) => (
								<FormItem className='flex flex-col'>
									<FormLabel>Tanggal lahir</FormLabel>
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
							name='lastEducation'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Pendidikan terakhir</FormLabel>
									<FormControl>
										<Select value={field.value} onValueChange={field.onChange}>
											<SelectTrigger className='bg-surface-secondary'>
												<SelectValue placeholder='Pend. Terakhir' />
											</SelectTrigger>
											<SelectContent>
												{['sd', 'smp', 'sma', 's1', 's2', 's3'].map(
													(i, index) => (
														<SelectItem key={index} value={i}>
															{i}
														</SelectItem>
													)
												)}
											</SelectContent>
										</Select>
									</FormControl>
								</FormItem>
							)}
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

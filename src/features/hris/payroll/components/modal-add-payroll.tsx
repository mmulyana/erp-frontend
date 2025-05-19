import { Loader, Plus } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import { handleFormError, handleFormSuccess } from '@/shared/utils/form'
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
import { useCreatePeriod } from '../api/use-create-period'
import { DatePickerField } from '@/shared/components/fields/data-picker-fields'
import { RadioGroup, RadioGroupItem } from '@/shared/components/ui/radio-group'
import { cn } from '@/shared/utils/cn'

type Form = {
	name: string
	startDate: Date
	endDate: Date
	payType: string
}

const options = [
	{
		id: 'daily',
		name: 'Harian',
		description: 'Pegawai gaji harian',
	},
	{
		id: 'monthly',
		name: 'Bulanan',
		description: 'Staf perusahaan',
	},
]

export default function ModalAddPayroll() {
	const [open, setOpen] = useState(false)
	const { mutate, isPending } = useCreatePeriod()
	const form = useForm<Form>({
		defaultValues: {
			name: '',
			startDate: undefined,
			endDate: undefined,
			payType: '',
		},
	})

	const submit = (payload: Form) => {
		mutate(payload, {
			onSuccess: handleFormSuccess(setOpen),
			onError: handleFormError<Form>(form),
		})
	}

	useEffect(() => {
		if (!open) {
			form.reset({
				name: '',
				startDate: undefined,
				endDate: undefined,
				payType: '',
			})
		}
	}, [open])

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button className='gap-2'>
					<Plus strokeWidth={2} size={16} className='text-white' />
					<span className='px-0.5'>Tambah Periode</span>
				</Button>
			</DialogTrigger>
			<DialogContent className='p-6'>
				<DialogTitle>Periode Gaji</DialogTitle>
				<DialogDescription>
					Pastikan semua data yang dimasukkan sudah benar sebelum disimpan.
				</DialogDescription>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(submit)}
						className='flex gap-4 flex-col pt-4'
					>
						<FormField
							name='name'
							control={form.control}
							render={({ field }) => (
								<FormItem className='flex flex-col'>
									<FormLabel>Nama</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<div className='flex gap-4'>
							<FormField
								name='startDate'
								control={form.control}
								render={({ field }) => (
									<FormItem className='flex flex-col w-full'>
										<FormLabel>Tanggal dimulai</FormLabel>
										<DatePickerField
											value={field.value}
											onChange={field.onChange}
										/>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								name='endDate'
								control={form.control}
								render={({ field }) => (
									<FormItem className='flex flex-col w-full'>
										<FormLabel>Tangga berakhir</FormLabel>
										<DatePickerField
											value={field.value}
											onChange={field.onChange}
										/>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						<div className='space-y-2'>
							<FormLabel className='mb-2'>Jenis Periode Gaji</FormLabel>
							<FormField
								control={form.control}
								name='payType'
								render={({ field }) => (
									<RadioGroup
										value={field.value}
										onValueChange={field.onChange}
										className='grid grid-cols-1 md:grid-cols-2 gap-4'
									>
										{options.map((option) => (
											<label
												key={option.id}
												htmlFor={option.id}
												className={cn(
													'relative flex items-center rounded-lg border p-4 cursor-pointer transition-colors',
													field.value === option.id
														? 'bg-blue-50 border-blue-600'
														: 'bg-white border-gray-200 hover:border-gray-300'
												)}
											>
												<div className='flex flex-col flex-1'>
													<span className='font-medium'>{option.name}</span>
													<span className='text-gray-500 text-sm'>
														{option.description}
													</span>
												</div>
												<div className='ml-auto'>
													<RadioGroupItem
														value={option.id}
														id={option.id}
														className={cn(
															'h-6 w-6 border-2',
															field.value === option.id
																? 'border-blue-600 text-blue-600'
																: 'border-gray-300'
														)}
													/>
												</div>
											</label>
										))}
									</RadioGroup>
								)}
							/>
						</div>

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

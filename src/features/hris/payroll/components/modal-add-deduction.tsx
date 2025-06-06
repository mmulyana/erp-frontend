import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Plus } from 'lucide-react'

import { RadioGroup, RadioGroupItem } from '@/shared/components/ui/radio-group'
import { Button } from '@/shared/components/ui/button'
import { Input } from '@/shared/components/ui/input'
import { cn } from '@/shared/utils/cn'
import {
	Dialog,
	DialogClose,
	DialogContent,
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

const options = [
	{
		name: 'Persenan',
		value: 'percent',
	},
	{
		name: 'Angka',
		value: 'numeric',
	},
]

type modalProps = {
	onClick: (name: string, type: string) => void
}
export default function ModalAddDeduction({ onClick }: modalProps) {
	const [open, setOpen] = useState(false)

	const defaultValues = {
		name: '',
		type: '',
	}

	type deductionForm = {
		name: string
		type: string
	}
	const form = useForm<deductionForm>({
		defaultValues,
	})

	const submit = (data: deductionForm) => {
		onClick(data.name, data.type)
		setOpen(false)
	}

	useEffect(() => {
		if (!open) form.reset(defaultValues)
		return () => form.reset(defaultValues)
	}, [open])

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button variant='outline' type='button'>
					<Plus size={18} />
					<span className='px-0.5'>Tambah</span>
				</Button>
			</DialogTrigger>
			<DialogContent className='max-w-[400px]'>
				<DialogTitle className='text-center mb-2'>Potongan Baru</DialogTitle>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(submit)} className='space-y-6 px-6'>
						<FormField
							control={form.control}
							name='name'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Nama potongan</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='type'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Jenis potongan</FormLabel>
									<FormControl>
										<div>
											<RadioGroup
												value={field.value}
												onValueChange={field.onChange}
												className='grid grid-cols-1 md:grid-cols-2 gap-4'
											>
												{options.map((option) => (
													<label
														key={option.value}
														htmlFor={option.value}
														className={cn(
															'relative flex items-center rounded-lg border p-2 cursor-pointer transition-colors',
															field.value === option.value
																? 'bg-blue-50 border-brand'
																: 'bg-white border-gray-200 hover:border-gray-300'
														)}
													>
														<p>{option.name}</p>
														<div className='ml-auto'>
															<RadioGroupItem
																value={option.value}
																id={option.value}
																className={cn(
																	'h-6 w-6 border-2',
																	field.value === option.value
																		? 'border-brand text-brand'
																		: 'border-gray-300'
																)}
															/>
														</div>
													</label>
												))}
											</RadioGroup>
										</div>
									</FormControl>
								</FormItem>
							)}
						/>
						<DialogFooter>
							<DialogClose>
								<Button variant='outline'>Batal</Button>
							</DialogClose>
							<Button
								type='button'
								onClick={() => {
									form.handleSubmit(submit)()
								}}
							>
								Simpan
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	)
}

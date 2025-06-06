import { Loader, Pencil } from 'lucide-react'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import { handleFormError, handleFormSuccess } from '@/shared/utils/form'
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
	DialogTrigger,
} from '@/shared/components/ui/dialog'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
} from '@/shared/components/ui/form'

import { useUpdateEmployee } from '../../api/use-update-employee'
import { useEmployee } from '../../api/use-employee'
import { EmployeeForm } from '../../types'

export default function ModalEditAddress() {
	const { id } = useParams()
	
	const { data, isPending } = useEmployee(id)
	const { mutate } = useUpdateEmployee()

	const [open, setOpen] = useState(false)
	const form = useForm<Partial<EmployeeForm>>({
		defaultValues: {
			address: '',
			phone: '',
		},
	})

	useEffect(() => {
		if (data) {
			form.reset({
				address: data.address,
				phone: data.phone,
			})
		}
	}, [data])

	const submit = (payload: Partial<EmployeeForm>) => {
		mutate(
			{ ...payload, id },
			{
				onSuccess: handleFormSuccess(setOpen),
				onError: handleFormError<EmployeeForm>(form),
			}
		)
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button variant='outline' className='gap-2'>
					<Pencil size={16} />
					<span className='px-0.5'>Edit</span>
				</Button>
			</DialogTrigger>
			<DialogContent className='p-6'>
				<DialogTitle>Alamat dan kontak</DialogTitle>
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
							name='phone'
							render={({ field }) => (
								<FormItem className='flex flex-col'>
									<FormLabel>Nomor telepon</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='address'
							render={({ field }) => (
								<FormItem className='flex flex-col'>
									<FormLabel>Alamat</FormLabel>
									<FormControl>
										<Textarea
											{...field}
											className='bg-surface-secondary w-full mt-2 md:mt-0 shadow-none'
										>
											Alamat
										</Textarea>
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

import { Button } from '@/shared/components/ui/button'
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/shared/components/ui/dialog'
import { handleFormError, handleFormSuccess } from '@/shared/utils/form'
import { Pencil } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { usePeriod } from '../api/use-period'
import { useUpdatePeriod } from '../api/use-update-period'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/shared/components/ui/form'
import { Input } from '@/shared/components/ui/input'
import ButtonSubmit from '@/shared/components/common/button-submit'
import ModalDeletePayroll from './modal-delete-payroll'

type Form = {
	name: string
}

export default function ModalDetailPayroll() {
	const [open, setOpen] = useState(false)

	const { id } = useParams()
	const { data } = usePeriod({ id: open ? id : '' })

	const { mutate, isPending } = useUpdatePeriod()
	const form = useForm<Form>({
		defaultValues: {
			name: '',
		},
	})

	const submit = (payload: Form) => {
		mutate(
			{ id, ...payload },
			{
				onSuccess: handleFormSuccess(setOpen),
				onError: handleFormError<Form>(form),
			}
		)
	}

	useEffect(() => {
		if (data?.data) {
			form.reset({
				name: data.data.name,
			})
		}
	}, [data])

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button className='gap-1' variant='outline'>
					<Pencil size={18} />
					<span className='px-0.5'>Edit</span>
				</Button>
			</DialogTrigger>
			<DialogContent className='p-6'>
				<DialogHeader>
					<DialogTitle>Periode Gaji</DialogTitle>
					<DialogDescription>
						Pastikan semua data yang dimasukkan sudah benar sebelum disimpan.
					</DialogDescription>
				</DialogHeader>
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
						<DialogFooter>
							<div className='flex justify-between w-full gap-4'>
								<ModalDeletePayroll />
								<div className='space-x-4'>
									<DialogClose asChild>
										<Button variant='outline' type='button'>
											Batal
										</Button>
									</DialogClose>
									<ButtonSubmit isPending={isPending} />
								</div>
							</div>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	)
}

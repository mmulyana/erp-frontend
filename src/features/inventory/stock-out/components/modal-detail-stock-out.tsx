import { useParams } from 'react-router-dom'
import { useStockOut } from '../api/use-stock-out'
import { useForm } from 'react-hook-form'
import { CreateStockOutPayload } from '../types'
import { useEffect, useState } from 'react'
import { useUpdateStockOut } from '../api/use-update-stock-out'
import { handleFormError, handleFormSuccess } from '@/shared/utils/form'
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
import { Button } from '@/shared/components/ui/button'
import { Image, List, Pencil } from 'lucide-react'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/shared/components/ui/form'
import CardV1 from '@/shared/components/common/card-v1'
import ProjectCombobox from '@/features/projects/project/components/project-combobox'
import { DatePickerField } from '@/shared/components/fields/data-picker-fields'
import { Textarea } from '@/shared/components/ui/textarea'
import { ImageUpload } from '@/shared/components/common/image-upload'
import ButtonSubmit from '@/shared/components/common/button-submit'

export default function ModalDetailStockOut() {
	const [open, setOpen] = useState(false)
	const { id } = useParams()

	const { mutate, isPending } = useUpdateStockOut()
	const { data } = useStockOut({ id })

	const form = useForm<CreateStockOutPayload>()
	const formWatch = form.watch()

	useEffect(() => {
		if (data?.data) {
			const res = data.data
			form.reset({
				date: new Date(res.date),
				note: res.note,
				photoUrl: res.photoUrl,
				projectId: res.projectId,
			})
		}
	}, [data])

	const onSubmit = (data: CreateStockOutPayload) => {
		if (!id) return
		mutate(
			{ ...data, id },
			{
				onSuccess: handleFormSuccess(setOpen),
				onError: handleFormError(form),
			}
		)
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button variant='outline'>
					<Pencil size={16} />
					<span className='px-0.5'>Edit</span>
				</Button>
			</DialogTrigger>

			<DialogContent>
				<DialogHeader>
					<DialogTitle className='text-center'>Stok keluar</DialogTitle>
					<DialogDescription className='text-center'>
						Pastikan semua data yang dimasukkan sudah benar sebelum disimpan.
					</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
						<CardV1
							title='Detail'
							icon={<List size={20} className='text-ink-primary' />}
							style={{
								content: 'space-y-6 pt-4',
								card: 'border-none',
							}}
						>
							{!!formWatch.projectId && (
								<FormField
									name='projectId'
									control={form.control}
									render={({ field }) => (
										<FormItem className='flex flex-col'>
											<FormLabel className='text-ink-primary/50'>
												Proyek
											</FormLabel>
											<ProjectCombobox
												defaultValue={field.value}
												onSelect={field.onChange}
											/>
											<FormMessage />
										</FormItem>
									)}
								/>
							)}
							<FormField
								name='date'
								control={form.control}
								render={({ field }) => (
									<FormItem className='flex flex-col'>
										<FormLabel className='text-ink-primary/50'>
											Tanggal
										</FormLabel>
										<DatePickerField
											value={field.value as Date}
											onChange={field.onChange}
											disabledDate={() => false}
										/>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								name='note'
								control={form.control}
								render={({ field }) => (
									<FormItem className='flex flex-col'>
										<FormLabel className='text-ink-primary/50'>
											Catatan
										</FormLabel>
										<FormControl>
											<Textarea {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</CardV1>
						<CardV1
							title='Foto'
							icon={<Image size={20} className='text-ink-primary' />}
							style={{
								content: 'pt-4',
								card: 'border-none',
							}}
						>
							<ImageUpload
								value={formWatch.photoUrl}
								onChange={(e) => form.setValue('photoUrl', e)}
								className='rounded'
							/>
						</CardV1>
						<DialogFooter className='px-6'>
							<DialogClose asChild>
								<Button variant='outline' type='button'>
									Batal
								</Button>
							</DialogClose>
							<ButtonSubmit isPending={isPending} />
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	)
}

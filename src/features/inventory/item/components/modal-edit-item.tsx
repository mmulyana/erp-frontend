import { useForm } from 'react-hook-form'
import { ItemForm } from '../types'
import { useEffect, useState } from 'react'
import { useUpdateItem } from '../api/use-update-item'
import { useParams } from 'react-router-dom'
import { useItem } from '../api/use-item'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/shared/components/ui/form'
import { Input } from '@/shared/components/ui/input'
import { EditorDescription } from '@/shared/components/common/tiptap/editor-description'
import { ImageUpload } from '@/shared/components/common/image-upload'
import LocationCombobox from '../../location/components/location-combobox'
import BrandCombobox from '../../brand/components/brand-combobox'
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
import { Pencil } from 'lucide-react'
import ButtonSubmit from '@/shared/components/common/button-submit'
import { handleFormError, handleFormSuccess } from '@/shared/utils/form'

type props = {
	variant: 'info' | 'detail'
}
export default function ModalEditItem({ variant }: props) {
	const { id } = useParams()
	const { data } = useItem({ id })
	const { mutate, isPending } = useUpdateItem()

	const [open, setOpen] = useState(false)

	const form = useForm<ItemForm>()
	const photoWatch = form.watch('photoUrl')

	useEffect(() => {
		if (data?.data) {
			const res = data.data
			form.reset({
				brandId: res.brandId || undefined,
				description: res.description,
				warehouseId: res.warehouseId || undefined,
				category: res.category || undefined,
				minimum: res.minimum || undefined,
				name: res.name,
				photoUrl: res.photoUrl,
				unitOfMeasurement: res.unitOfMeasurement || undefined,
			})
		}
	}, [data])

	const submit = (data: ItemForm) => {
		if (!id) return

		mutate(
			{ ...data, id },
			{
				onSuccess: handleFormSuccess(setOpen),
				onError: handleFormError<ItemForm>(form),
			}
		)
	}

	const FormType = {
		info: (
			<div className='space-y-4'>
				<FormItem className='flex flex-col'>
					<FormLabel>Foto</FormLabel>
					<ImageUpload
						value={photoWatch}
						onChange={(e) => form.setValue('photoUrl', e)}
					/>
				</FormItem>
				<FormField
					name='name'
					control={form.control}
					render={({ field }) => (
						<FormItem>
							<FormLabel>Nama</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					name='description'
					control={form.control}
					render={({ field }) => (
						<FormItem>
							<FormLabel>Deskripsi</FormLabel>
							<FormControl>
								<EditorDescription
									content={field.value}
									onChange={field.onChange}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			</div>
		),

		detail: (
			<div className='space-y-4'>
				<FormField
					name='category'
					control={form.control}
					render={({ field }) => (
						<FormItem>
							<FormLabel>Kategori</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					name='unitOfMeasurement'
					control={form.control}
					render={({ field }) => (
						<FormItem>
							<FormLabel>Satuan Ukur</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					name='warehouseId'
					control={form.control}
					render={({ field }) => (
						<FormItem>
							<FormLabel>Gudang</FormLabel>
							<FormControl>
								<LocationCombobox
									defaultValue={field.value || ''}
									onSelect={field.onChange}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					name='brandId'
					control={form.control}
					render={({ field }) => (
						<FormItem>
							<FormLabel>Merek</FormLabel>
							<FormControl>
								<BrandCombobox
									defaultValue={field.value || ''}
									onSelect={field.onChange}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			</div>
		),
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button variant='outline' className='gap-2 absolute right-4 z-10'>
					<Pencil size={16} />
					<span className='px-0.5'>Edit</span>
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle className='text-center'>Barang</DialogTitle>
					<DialogDescription className='text-center'>
						Pastikan semua data yang dimasukkan sudah benar sebelum disimpan.
					</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form className='px-4 pt-4' onSubmit={form.handleSubmit(submit)}>
						{FormType[variant as keyof typeof FormType]}
						<DialogFooter className='pt-6'>
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

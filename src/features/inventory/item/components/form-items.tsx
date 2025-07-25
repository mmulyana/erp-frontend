import { UseFormReturn } from 'react-hook-form'
import { ItemForm } from '../types'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/shared/components/ui/form'
import { ImageUpload } from '@/shared/components/common/image-upload'
import { Input } from '@/shared/components/ui/input'
import { EditorDescription } from '@/shared/components/common/tiptap/editor-description'
import BrandCombobox from '../../brand/components/brand-combobox'
import LocationCombobox from '../../location/components/location-combobox'
import { DialogClose, DialogFooter } from '@/shared/components/ui/dialog'
import ButtonSubmit from '@/shared/components/common/button-submit'
import { Button } from '@/shared/components/ui/button'

export default function FormItems({
	form,
	onSubmit,
	isPending,
}: {
	form: UseFormReturn<ItemForm>
	onSubmit: (data: ItemForm) => void
	isPending: boolean
}) {
	const photoWatch = form.watch('photoUrl')

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='flex gap-4 flex-col pt-4'
			>
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
						<FormItem className='flex flex-col'>
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
						<FormItem className='flex flex-col'>
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
				<FormField
					name='category'
					control={form.control}
					render={({ field }) => (
						<FormItem className='flex flex-col'>
							<FormLabel>Kategori</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
					<FormField
						name='minimum'
						control={form.control}
						render={({ field }) => (
							<FormItem className='flex flex-col'>
								<FormLabel>Minimum stok</FormLabel>
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
							<FormItem className='flex flex-col'>
								<FormLabel>Satuan ukur</FormLabel>
								<FormControl>
									<Input {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						name='brandId'
						control={form.control}
						render={({ field }) => (
							<FormItem className='flex flex-col'>
								<FormLabel>Merek</FormLabel>
								<FormControl>
									<BrandCombobox
										onSelect={field.onChange}
										defaultValue={field.value || ''}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						name='warehouseId'
						control={form.control}
						render={({ field }) => (
							<FormItem className='flex flex-col'>
								<FormLabel>Lokasi</FormLabel>
								<FormControl>
									<LocationCombobox
										onSelect={field.onChange}
										defaultValue={field.value || ''}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
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
						<ButtonSubmit isPending={isPending} />
					</div>
				</DialogFooter>
			</form>
		</Form>
	)
}

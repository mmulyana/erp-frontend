import { House, Image, List, Package } from 'lucide-react'
import { useFieldArray, useForm } from 'react-hook-form'

import ItemCombobox from '@/features/inventory/item/components/item-combobox'

import { DatePickerField } from '@/shared/components/fields/data-picker-fields'
import { ImageUpload } from '@/shared/components/common/image-upload'
import DetailLayout, { Link } from '@/shared/layout/detail-layout'
import { Textarea } from '@/shared/components/ui/textarea'
import CardV1 from '@/shared/components/common/card-v1'
import { Button } from '@/shared/components/ui/button'
import { Input } from '@/shared/components/ui/input'
import { formatThousands } from '@/shared/utils'
import { paths } from '@/shared/constants/paths'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/shared/components/ui/form'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/shared/components/ui/table'

import SupplierCombobox from '@/features/inventory/supplier/components/supplier-combobox'

const links: Link[] = [
	{
		icon: <House size={20} />,
		name: 'Dashboard',
		path: paths.inventory,
		hideName: true,
	},
	{
		name: 'Stock keluar',
		path: paths.inventoryStockOut,
	},
	{
		name: 'Baru',
		path: paths.inventoryStockOutNew,
	},
]

type StockInForm = {
	date: Date
	note: string
	photoUrl: string | File | null
	items: {
		productId: string
		quantity: number
		price: number
	}[]
}

export default function NewStockOut() {
	const form = useForm<StockInForm>({
		defaultValues: {
			items: [{ productId: '', quantity: 0, price: 0 }],
		},
	})

	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: 'items',
	})

	const photoWatch = form.watch('photoUrl')

	const submit = (payload: StockInForm) => {
		console.log(payload)
	}

	return (
		<DetailLayout
			links={links}
			style={{ header: 'w-[800px] max-w-full px-6 md:px-0' }}
			titleAction='Simpan'
			action={() => form.handleSubmit(submit)()}
		>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(submit)}
					className='flex flex-col gap-6 max-w-full w-[800px] mx-auto pt-6 px-6 md:px-0 pb-10'
				>
					<div className='space-y-6'>
						<CardV1
							title='Detail'
							icon={<List size={20} className='text-ink-primary' />}
							style={{ content: 'space-y-6 pt-4' }}
						>
							<FormField
								name='date'
								control={form.control}
								render={({ field }) => (
									<FormItem className='flex flex-col'>
										<FormLabel className='text-ink-primary/50'>
											Tanggal
										</FormLabel>
										<DatePickerField
											value={field.value}
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
							style={{ content: 'pt-4' }}
						>
							<ImageUpload
								value={photoWatch}
								onChange={(e) => form.setValue('photoUrl', e)}
								className='rounded'
							/>
						</CardV1>
					</div>

					<CardV1
						title='Daftar Barang'
						icon={<Package size={20} className='text-ink-primary' />}
						style={{ card: 'h-fit', content: 'pt-4 space-y-2' }}
					>
						<Table>
							<TableHeader>
								<TableRow className='border-none'>
									<TableHead className='h-10 bg-[#F7F7F7] rounded-l-md w-[200px]'>
										Barang
									</TableHead>
									<TableHead className='h-10 bg-[#F7F7F7] w-24'>Qty</TableHead>
									<TableHead className='h-10 bg-[#F7F7F7] w-1/4'>
										Harga
									</TableHead>
									<TableHead className='h-10 bg-[#F7F7F7] w-1/4 text-right'>
										Total
									</TableHead>
									<TableHead className='h-10 bg-[#F7F7F7] rounded-r-md'></TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{fields.map((item, index) => {
									const quantity = form.watch(`items.${index}.quantity`)
									const price = form.watch(`items.${index}.price`)
									const total = quantity * price

									return (
										<TableRow key={item.id} className='border-none'>
											<TableCell>
												<FormField
													control={form.control}
													name={`items.${index}.productId`}
													render={({ field }) => (
														<ItemCombobox
															onSelect={field.onChange}
															defaultValue={field.value || ''}
														/>
													)}
												/>
											</TableCell>
											<TableCell>
												<FormField
													control={form.control}
													name={`items.${index}.quantity`}
													render={({ field }) => (
														<Input type='number' {...field} />
													)}
												/>
											</TableCell>
											<TableCell>
												<FormField
													control={form.control}
													name={`items.${index}.price`}
													render={({ field }) => (
														<Input type='number' {...field} />
													)}
												/>
											</TableCell>
											<TableCell className='text-right'>
												{formatThousands(total)}
											</TableCell>
											<TableCell>
												<Button
													variant='ghost'
													className='text-error hover:text-red-600'
													onClick={() => remove(index)}
													type='button'
												>
													Hapus
												</Button>
											</TableCell>
										</TableRow>
									)
								})}
							</TableBody>
						</Table>
						<Button
							type='button'
							variant='outline'
							onClick={() => append({ productId: '', quantity: 0, price: 0 })}
						>
							Tambah Barang
						</Button>
					</CardV1>
				</form>
			</Form>
		</DetailLayout>
	)
}

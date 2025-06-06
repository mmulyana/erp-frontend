import { House, Image, List, Package } from 'lucide-react'
import { useFieldArray, UseFormReturn } from 'react-hook-form'
import { NumericFormat } from 'react-number-format'

import SupplierCombobox from '@/features/inventory/supplier/components/supplier-combobox'
import ItemCombobox from '@/features/inventory/item/components/item-combobox'
import { StockInForm } from '@/features/inventory/stock-in/type'

import CardV1 from '@/shared/components/common/card-v1'
import { DatePickerField } from '@/shared/components/fields/data-picker-fields'
import { ImageUpload } from '@/shared/components/common/image-upload'
import { Textarea } from '@/shared/components/ui/textarea'
import { Button } from '@/shared/components/ui/button'
import { Input } from '@/shared/components/ui/input'
import { formatThousands } from '@/shared/utils'
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
import { DialogClose, DialogFooter } from '@/shared/components/ui/dialog'
import ButtonSubmit from '@/shared/components/common/button-submit'
import { cn } from '@/shared/utils/cn'

type props = {
	form: UseFormReturn<StockInForm>
	onSubmit: (payload: StockInForm) => void
	variant?: 'new' | 'edit'
	isPending?: boolean
}

export default function FormStockIn({
	form,
	onSubmit,
	variant = 'new',
	isPending,
}: props) {
	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: 'items',
	})

	const isEdit = variant === 'edit'

	const photoWatch = form.watch('photoUrl')

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className={cn(
					'flex flex-col gap-6 max-w-full w-[800px] mx-auto pt-6 px-6 md:px-0',
					!isEdit && 'pb-10'
				)}
			>
				<div className='space-y-6'>
					<CardV1
						title='Detail'
						icon={<List size={20} className='text-ink-primary' />}
						style={{
							content: 'space-y-6 pt-4',
							card: isEdit ? 'border-none' : '',
						}}
					>
						<FormField
							name='date'
							control={form.control}
							render={({ field }) => (
								<FormItem className='flex flex-col'>
									<FormLabel className='text-ink-primary/50'>Tanggal</FormLabel>
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
							name='referenceNumber'
							control={form.control}
							render={({ field }) => (
								<FormItem className='flex flex-col'>
									<FormLabel className='text-ink-primary/50'>
										Nomor referensi
									</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							name='supplierId'
							control={form.control}
							render={({ field }) => (
								<FormItem className='flex flex-col'>
									<FormLabel className='text-ink-primary/50'>
										Supplier
									</FormLabel>
									<FormControl>
										<SupplierCombobox
											onSelect={field.onChange}
											defaultValue={field.value || ''}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							name='note'
							control={form.control}
							render={({ field }) => (
								<FormItem className='flex flex-col'>
									<FormLabel className='text-ink-primary/50'>Catatan</FormLabel>
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
							card: isEdit ? 'border-none' : '',
						}}
					>
						<ImageUpload
							value={photoWatch}
							onChange={(e) => form.setValue('photoUrl', e)}
							className='rounded'
						/>
					</CardV1>
				</div>

				{isEdit ? (
					<DialogFooter>
						<div className='flex justify-between px-6'>
							<div className='flex gap-4 justify-end'>
								<DialogClose asChild>
									<Button variant='outline' type='button'>
										Batal
									</Button>
								</DialogClose>
								<ButtonSubmit isPending={isPending || false} />
							</div>
						</div>
					</DialogFooter>
				) : (
					<CardV1
						title='Daftar Barang'
						icon={<Package size={20} className='text-ink-primary' />}
						style={{ card: 'h-fit', content: 'pt-4 space-y-2' }}
					>
						<Table>
							<TableHeader>
								<TableRow className='border-none'>
									<TableHead className='w-[200px] bg-[#F7F7F7] rounded-l-md'>
										Barang
									</TableHead>
									<TableHead className='w-24 bg-[#F7F7F7]'>Qty</TableHead>
									<TableHead className='w-1/4 bg-[#F7F7F7]'>Harga</TableHead>
									<TableHead className='w-1/4 bg-[#F7F7F7] text-right'>
										Total
									</TableHead>
									<TableHead className='bg-[#F7F7F7] rounded-r-md'></TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{fields.map((item, index) => {
									const quantity = form.watch(`items.${index}.quantity`)
									const price = form.watch(`items.${index}.unitPrice`)
									const total = quantity * price

									return (
										<TableRow key={item.id} className='border-none'>
											<TableCell>
												<FormField
													control={form.control}
													name={`items.${index}.itemId`}
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
														<Input type='number' {...field} min={1} />
													)}
												/>
											</TableCell>
											<TableCell>
												<FormField
													control={form.control}
													name={`items.${index}.unitPrice`}
													render={({ field }) => {
														const usedField = { ...field }
														delete (usedField as any).onChange
														return (
															<FormItem>
																<FormControl>
																	<div className='relative'>
																		<div className='absolute top-1/2 -translate-y-1/2 px-3 left-[1px] border-r border-border h-[calc(100%-2px)] flex justify-center items-center select-none text-sm text-ink-secondary font-medium'>
																			Rp
																		</div>
																		<NumericFormat
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
							onClick={() => append({ itemId: '', quantity: 0, unitPrice: 0 })}
						>
							Tambah Barang
						</Button>
					</CardV1>
				)}
			</form>
		</Form>
	)
}

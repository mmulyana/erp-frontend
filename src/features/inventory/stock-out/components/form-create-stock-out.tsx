import { useFieldArray, UseFormReturn } from 'react-hook-form'
import { NumericFormat } from 'react-number-format'
import { Image, List, Package } from 'lucide-react'

import ProjectCombobox from '@/features/projects/project/components/project-combobox'
import ItemCombobox from '@/features/inventory/item/components/item-combobox'

import ButtonSubmit from '@/shared/components/common/button-submit'
import CardV1 from '@/shared/components/common/card-v1'
import { DatePickerField } from '@/shared/components/fields/data-picker-fields'
import { DialogClose, DialogFooter } from '@/shared/components/ui/dialog'
import { ImageUpload } from '@/shared/components/common/image-upload'
import { Textarea } from '@/shared/components/ui/textarea'
import { Button } from '@/shared/components/ui/button'
import { Input } from '@/shared/components/ui/input'
import { formatThousands } from '@/shared/utils'
import { cn } from '@/shared/utils/cn'
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

import { StockOutForm } from '../types'

type props = {
	projectId?: string
	form: UseFormReturn<StockOutForm>
	onSubmit: (data: StockOutForm) => void
	isPending?: boolean
	variant?: 'project' | 'form'
}
export default function FormCreateStockOut({
	form,
	onSubmit,
	projectId,
	isPending,
	variant = 'form',
}: props) {
	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: 'items',
	})

	const photoWatch = form.watch('photoUrl')

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className={cn(
					'flex flex-col max-w-full w-[800px] mx-auto pt-6 px-6 md:px-0',
					variant === 'form' && 'pb-10 gap-6'
				)}
			>
				<div className='space-y-6'>
					<CardV1
						title='Detail'
						icon={<List size={20} className='text-ink-primary' />}
						style={{
							content: 'space-y-6 pt-4',
							card: variant === 'project' ? 'border-none' : '',
						}}
					>
						{!projectId && projectId === '' && (
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
							card: variant === 'project' ? 'border-none' : '',
						}}
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
					style={{
						card: variant === 'project' ? 'border-none mt-4' : 'h-fit',
						content: 'pt-4 space-y-2',
					}}
				>
					<Table>
						<TableHeader>
							<TableRow className='border-none'>
								<TableHead className='h-10 bg-[#F7F7F7] rounded-l-md w-[200px]'>
									Barang
								</TableHead>
								<TableHead className='h-10 bg-[#F7F7F7] w-24'>Qty</TableHead>
								<TableHead className='h-10 bg-[#F7F7F7] w-1/4'>Harga</TableHead>
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
												name={`items.${index}.itemId`}
												render={({ field }) => (
													<FormItem className='relative'>
														<FormControl>
															<ItemCombobox
																onSelect={field.onChange}
																defaultValue={field.value || ''}
															/>
														</FormControl>
														<FormMessage className='absolute text-nowrap text-sm -bottom-5' />
													</FormItem>
												)}
											/>
										</TableCell>
										<TableCell>
											<FormField
												control={form.control}
												name={`items.${index}.quantity`}
												render={({ field, fieldState: { error } }) => (
													<FormItem className='relative'>
														<FormControl>
															<Input
																type='number'
																{...field}
																className={cn(
																	'min-w-14',
																	error?.message &&
																		error.message !== '' &&
																		'!border-error'
																)}
															/>
														</FormControl>
														<FormMessage className='absolute text-nowrap text-sm -bottom-5' />
													</FormItem>
												)}
											/>
										</TableCell>
										<TableCell>
											<FormField
												control={form.control}
												name={`items.${index}.price`}
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
																		type='text'
																		thousandSeparator='.'
																		decimalSeparator=','
																		customInput={Input}
																		className='h-10 min-w-40 pl-12'
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
						onClick={() => append({ itemId: '', quantity: 0, price: 0 })}
					>
						Tambah Barang
					</Button>
				</CardV1>
				{projectId && (
					<DialogFooter>
						<div className='flex gap-4 justify-end px-6'>
							<DialogClose asChild>
								<Button type='button' variant='outline'>
									Batal
								</Button>
							</DialogClose>
							<ButtonSubmit isPending={isPending || false} />
						</div>
					</DialogFooter>
				)}
			</form>
		</Form>
	)
}

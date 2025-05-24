import { UseFormReturn } from 'react-hook-form'
import { Image, List } from 'lucide-react'

import ProjectCombobox from '@/features/projects/project/components/project-combobox'

import ButtonSubmit from '@/shared/components/common/button-submit'
import CardV1 from '@/shared/components/common/card-v1'
import { DatePickerField } from '@/shared/components/fields/data-picker-fields'
import { ImageUpload } from '@/shared/components/common/image-upload'
import { DialogClose } from '@/shared/components/ui/dialog'
import { Textarea } from '@/shared/components/ui/textarea'
import { Button } from '@/shared/components/ui/button'
import { Input } from '@/shared/components/ui/input'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
} from '@/shared/components/ui/form'

import ItemCombobox from '../../item/components/item-combobox'
import { loanForm } from '../types'

type props = {
	variant: 'project' | 'form' | 'edit'
	projectId?: string
	callback?: () => void
	form: UseFormReturn<loanForm>
	onSubmit: (data: loanForm) => void
}
export default function FormCreateLoan({
	variant,
	projectId,
	form,
	onSubmit,
}: props) {
	const isEdit = variant === 'edit'
	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)}>
				<CardV1
					title='Detail'
					icon={<List size={20} className='text-ink-primary' />}
					style={{
						content:
							variant === 'project' || isEdit ? 'pt-4 space-y-4' : 'space-y-4',
						card: variant === 'project' || isEdit ? 'border-none' : '',
					}}
				>
					{!projectId && projectId === '' && !isEdit && (
						<FormField
							control={form.control}
							name='projectId'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Proyek</FormLabel>
									<FormControl>
										<ProjectCombobox
											defaultValue={field.value}
											onSelect={field.onChange}
										/>
									</FormControl>
								</FormItem>
							)}
						/>
					)}
					<FormField
						control={form.control}
						name='requestDate'
						render={({ field }) => (
							<FormItem className='flex flex-col'>
								<FormLabel>Tanggal</FormLabel>
								<FormControl>
									<DatePickerField
										value={field.value}
										onChange={field.onChange}
										disabledDate={() => false}
									/>
								</FormControl>
							</FormItem>
						)}
					/>
					{!isEdit && (
						<FormField
							control={form.control}
							name='inventoryId'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Barang</FormLabel>
									<FormControl>
										<ItemCombobox
											defaultValue={field.value}
											onSelect={field.onChange}
										/>
									</FormControl>
								</FormItem>
							)}
						/>
					)}
					{!isEdit && (
						<FormField
							control={form.control}
							name='requestQuantity'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Qty</FormLabel>
									<FormControl>
										<Input {...field} type='number' />
									</FormControl>
								</FormItem>
							)}
						/>
					)}
					<FormField
						control={form.control}
						name='note'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Keterangan</FormLabel>
								<FormControl>
									<Textarea {...field} />
								</FormControl>
							</FormItem>
						)}
					/>
				</CardV1>

				<CardV1
					title='Bukti'
					icon={<Image size={20} className='text-ink-primary' />}
					style={{
						content:
							variant === 'project' || isEdit ? 'pt-4 space-y-4' : 'space-y-4',
						card: variant === 'project' || isEdit ? 'border-none' : '',
					}}
				>
					<FormField
						control={form.control}
						name='photoUrlIn'
						render={({ field }) => (
							<FormItem>
								<FormLabel className='font-medium text-ink-primary'>
									Bukti barang keluar
								</FormLabel>
								<FormControl>
									<ImageUpload onChange={field.onChange} value={field.value} />
								</FormControl>
							</FormItem>
						)}
					/>
				</CardV1>

				{projectId && (
					<div className='pt-4 flex justify-end gap-4 px-6'>
						<DialogClose asChild>
							<Button variant='outline'>Batal</Button>
						</DialogClose>
						<ButtonSubmit isPending={false} />
					</div>
				)}
			</form>
		</Form>
	)
}

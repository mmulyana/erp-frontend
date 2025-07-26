import { UseFormReturn } from 'react-hook-form'
import { Image, List } from 'lucide-react'

import ButtonSubmit from '@/shared/components/common/button-submit'
import CardV1 from '@/shared/components/common/card-v1'
import { DatePickerField } from '@/shared/components/fields/data-picker-fields'
import { ImageUpload } from '@/shared/components/common/image-upload'
import { DialogClose } from '@/shared/components/ui/dialog'
import { Button } from '@/shared/components/ui/button'
import { Input } from '@/shared/components/ui/input'
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
} from '@/shared/components/ui/form'

import { returnForm } from '../types'

type props = {
	form: UseFormReturn<returnForm>
	onSubmit: (data: returnForm) => void
	isPending?: boolean
	returnedQty?: number
	requestQty?: number
	measurement?: string
}
export default function FormReturnLoan({
	form,
	onSubmit,
	isPending,
	returnedQty,
	requestQty,
	measurement,
}: props) {
	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)}>
				<CardV1
					title='Detail'
					icon={<List size={20} className='text-ink-primary' />}
					style={{
						content: 'space-y-6 pt-4',
						card: 'border-none',
					}}
				>
					<FormField
						control={form.control}
						name='returnDate'
						render={({ field }) => (
							<FormItem className='flex flex-col'>
								<FormLabel>Tanggal Dikembalikan</FormLabel>
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

					<FormField
						control={form.control}
						name='returnedQuantity'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Jumlah</FormLabel>
								<FormControl>
									<Input {...field} type='number' min={1} />
								</FormControl>
								<FormDescription className='text-base'>
									<span className='text-error'>*</span> Sisa{' '}
									{(requestQty || 0) - (returnedQty || 0)} {measurement} yg
									belum dikembalikan
								</FormDescription>
							</FormItem>
						)}
					/>
				</CardV1>

				<CardV1
					title='Bukti Pengembalian'
					icon={<Image size={20} className='text-ink-primary' />}
					style={{
						content: 'space-y-4 pt-4',
						card: 'border-none',
					}}
				>
					<FormField
						control={form.control}
						name='photoUrlOut'
						render={({ field }) => (
							<FormItem>
								<FormLabel className='font-medium text-ink-primary'>
									Bukti barang masuk
								</FormLabel>
								<FormControl>
									<ImageUpload onChange={field.onChange} value={field.value} />
								</FormControl>
							</FormItem>
						)}
					/>
				</CardV1>

				<div className='pt-4 flex justify-end gap-4 px-6'>
					<DialogClose asChild>
						<Button variant='outline'>Batal</Button>
					</DialogClose>
					<ButtonSubmit isPending={isPending || false} />
				</div>
			</form>
		</Form>
	)
}

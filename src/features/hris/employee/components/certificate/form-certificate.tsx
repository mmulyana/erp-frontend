import { UseFormReturn } from 'react-hook-form'

import { DatePickerField } from '@/shared/components/fields/data-picker-fields'
import { DialogClose, DialogFooter } from '@/shared/components/ui/dialog'
import ButtonSubmit from '@/shared/components/common/button-submit'
import FileUpload from '@/shared/components/common/file-upload'
import { Button } from '@/shared/components/ui/button'
import { Input } from '@/shared/components/ui/input'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
} from '@/shared/components/ui/form'

import { CertificateForm } from '../../types'

export default function FormCertificate({
	form,
	onSubmit,
	isPending,
}: {
	form: UseFormReturn<CertificateForm>
	onSubmit: (data: CertificateForm) => void
	isPending: boolean
}) {
	return (
		<Form {...form}>
			<form
				className='flex gap-4 flex-col pt-4'
				onSubmit={form.handleSubmit(onSubmit)}
			>
				<FormField
					control={form.control}
					name='file'
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<FileUpload onChange={field.onChange} accept='.pdf,.docx' />
							</FormControl>
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='name'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Nama</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='publisher'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Organisasi Penerbit</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
						</FormItem>
					)}
				/>

				<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
					<FormField
						control={form.control}
						name='issueDate'
						render={({ field }) => (
							<FormItem className='flex flex-col'>
								<FormLabel>Tanggal terbit</FormLabel>
								<FormControl>
									<DatePickerField
										value={field.value}
										onChange={field.onChange}
										disabledDate={(date) => date < new Date('1900-01-01')}
									/>
								</FormControl>
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='expiryDate'
						render={({ field }) => (
							<FormItem className='flex flex-col'>
								<FormLabel>Tanggal kadaluwarsa</FormLabel>
								<FormControl>
									<DatePickerField
										value={field.value}
										onChange={field.onChange}
										disabledDate={(date) => date < new Date('1900-01-01')}
									/>
								</FormControl>
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

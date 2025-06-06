import ImageUploadGrid from '@/shared/components/common/image-upload-grid'
import ButtonSubmit from '@/shared/components/common/button-submit'
import PhotoUrl from '@/shared/components/common/photo-url'

import { DialogClose, DialogFooter } from '@/shared/components/ui/dialog'
import { Textarea } from '@/shared/components/ui/textarea'
import { Button } from '@/shared/components/ui/button'
import {
	Form,
	FormField,
	FormItem,
	FormLabel,
	FormControl,
} from '@/shared/components/ui/form'
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from '@/shared/components/ui/select'

import { reportTypes } from '../constant/types'

type ReportFormProps = {
	form: any
	onSubmit: (values: any) => void
	isPending: boolean
	attachments?: { id: string; photoUrl: string }[]
	onDeleteAttachment?: (id: string) => void
}

export function FormReport({
	form,
	onSubmit,
	isPending,
	attachments = [],
	onDeleteAttachment,
}: ReportFormProps) {
	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
				<FormField
					control={form.control}
					name='message'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Pesan</FormLabel>
							<FormControl>
								<Textarea {...field} placeholder='Isi pesan laporan...' />
							</FormControl>
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='type'
					render={({ field }) => (
						<FormItem className='flex-1'>
							<FormLabel>Tipe Laporan</FormLabel>
							<FormControl>
								<Select value={field.value} onValueChange={field.onChange}>
									<SelectTrigger className='w-full'>
										<SelectValue placeholder='Tipe laporan' />
									</SelectTrigger>
									<SelectContent>
										<SelectGroup>
											<SelectLabel>Tipe laporan</SelectLabel>
											{reportTypes.map((i) => (
												<SelectItem key={i} value={i}>
													{i}
												</SelectItem>
											))}
										</SelectGroup>
									</SelectContent>
								</Select>
							</FormControl>
						</FormItem>
					)}
				/>

				<FormField
					name='attachments'
					control={form.control}
					render={({ field }) => <ImageUploadGrid onChange={field.onChange} />}
				/>

				<div className='space-y-6'>
					{attachments?.map((i) => (
						<div className='flex justify-between items-center' key={i.id}>
							<div className='flex gap-2 items-center'>
								<PhotoUrl
									url={i.photoUrl}
									style={{ img: 'h-16 w-16 rounded-lg' }}
								/>
								<p className='text-ink-primary'>{i.photoUrl}</p>
							</div>
							<Button
								type='button'
								variant='destructive'
								onClick={() => onDeleteAttachment?.(i.id)}
							>
								Hapus
							</Button>
						</div>
					))}
				</div>

				<DialogFooter>
					<div className='flex justify-end gap-4'>
						<DialogClose asChild>
							<Button variant='outline'>Batal</Button>
						</DialogClose>
						<ButtonSubmit isPending={isPending} />
					</div>
				</DialogFooter>
			</form>
		</Form>
	)
}

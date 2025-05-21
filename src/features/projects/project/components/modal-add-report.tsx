import {
	AlertCircleIcon,
	ImageIcon,
	Plus,
	UploadIcon,
	XIcon,
} from 'lucide-react'
import { useForm } from 'react-hook-form'
import { useState } from 'react'

import ButtonSubmit from '@/shared/components/common/button-submit'
import { maxFiles, maxSize, maxSizeMB } from '@/shared/constants/common'
import { useFileUpload } from '@/shared/hooks/use-file-upload'
import { Textarea } from '@/shared/components/ui/textarea'
import { Button } from '@/shared/components/ui/button'
import {
	Dialog,
	DialogTrigger,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogFooter,
	DialogDescription,
} from '@/shared/components/ui/dialog'
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

import { useCreateReport } from '../api/report/use-create-report'
import { reportTypes } from '../constant/types'

type FormValues = {
	message: string
	type: string
	date: Date
}

export function ModalAddReport({ projectId }: { projectId?: string }) {
	const [open, setOpen] = useState(false)
	const [
		{ files, errors, isDragging },
		{
			handleDragEnter,
			handleDragLeave,
			handleDragOver,
			handleDrop,
			openFileDialog,
			removeFile,
			clearFiles,
			getInputProps,
		},
	] = useFileUpload({
		multiple: true,
		maxFiles: maxFiles,
		maxSize: maxSize,
		accept: 'image/*',
	})

	const form = useForm<FormValues>({
		defaultValues: {
			message: '',
			type: '',
		},
	})

	const { mutate: createReport, isPending } = useCreateReport()

	const onSubmit = (data: FormValues) => {
		if (!projectId) return

		createReport(
			{ ...data, projectId, attachments: files.map((i) => i.file as File) },
			{
				onSuccess: () => {
					form.reset()
					setOpen(false)
				},
			}
		)
	}

	return (
		<Dialog onOpenChange={setOpen} open={open}>
			<DialogTrigger asChild>
				<Button>
					<Plus size={18} className='text-white' />
					<span className='px-0.5'>Buat Laporan</span>
				</Button>
			</DialogTrigger>
			<DialogContent className='max-w-lg px-6'>
				<DialogHeader>
					<DialogTitle className='text-center'>Laporan Baru</DialogTitle>
					<DialogDescription className='text-center'>
						Pastikan semua data yang dimasukkan sudah benar sebelum disimpan.
					</DialogDescription>
				</DialogHeader>

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
												<SelectValue placeholder='Tipe lampiran' />
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

						<div
							onDragEnter={handleDragEnter}
							onDragLeave={handleDragLeave}
							onDragOver={handleDragOver}
							onDrop={handleDrop}
							data-dragging={isDragging || undefined}
							data-files={files.length > 0 || undefined}
							className='border-input data-[dragging=true]:bg-accent/50 has-[input:focus]:border-ring has-[input:focus]:ring-ring/50 relative flex h-fit flex-col items-center overflow-hidden rounded-xl border border-dashed p-4 transition-colors not-data-[files]:justify-center has-[input:focus]:ring-[3px]'
						>
							<input
								{...getInputProps()}
								className='sr-only'
								aria-label='Upload image file'
							/>
							{files.length > 0 ? (
								<div className='flex w-full flex-col gap-3'>
									<div className='flex items-center justify-between gap-2'>
										<h3 className='truncate text-sm font-medium'>
											Uploaded Files ({files.length})
										</h3>
										<div className='flex gap-4 items-center'>
											<Button
												type='button'
												className='bg-error hover:bg-red-600'
												variant='destructive'
												onClick={clearFiles}
											>
												Hapus semua
											</Button>
											<Button
												type='button'
												variant='outline'
												size='sm'
												onClick={openFileDialog}
												disabled={files.length >= 10}
											>
												<UploadIcon
													className='-ms-0.5 size-3.5 opacity-60'
													aria-hidden='true'
												/>
												Tambah
											</Button>
										</div>
									</div>

									<div className='grid grid-cols-4 gap-4 md:grid-cols-3'>
										{files.map((file) => (
											<div
												key={file.id}
												className='bg-accent relative aspect-square rounded-md'
											>
												<img
													src={file.preview}
													alt={file.file.name}
													className='size-full rounded-[inherit] object-cover'
												/>
												<Button
													type='button'
													onClick={() => removeFile(file.id)}
													size='icon'
													className='border-background focus-visible:border-background absolute -top-2 -right-2 size-6 rounded-full border-2 shadow-none'
													aria-label='Remove image'
												>
													<XIcon className='size-3.5' />
												</Button>
											</div>
										))}
									</div>
								</div>
							) : (
								<div className='flex flex-col items-center justify-center px-4 py-3 text-center'>
									<div
										className='bg-background mb-2 flex size-11 shrink-0 items-center justify-center rounded-full border'
										aria-hidden='true'
									>
										<ImageIcon className='size-4 opacity-60' />
									</div>
									<p className='mb-1.5 text-sm font-medium'>
										Drop your images here
									</p>
									<p className='text-muted-foreground text-xs'>
										SVG, PNG, JPG or GIF (max. {maxSizeMB}MB)
									</p>
									<Button
										type='button'
										variant='outline'
										className='mt-4 gap-2 px-3'
										onClick={openFileDialog}
									>
										<UploadIcon
											className='-ms-1 opacity-60'
											aria-hidden='true'
											size={18}
										/>
										Pilih gambar
									</Button>
								</div>
							)}
						</div>

						{errors.length > 0 && (
							<div
								className='text-destructive flex items-center gap-1 text-xs'
								role='alert'
							>
								<AlertCircleIcon className='size-3 shrink-0' />
								<span>{errors[0]}</span>
							</div>
						)}

						<DialogFooter>
							<ButtonSubmit isPending={isPending} />
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	)
}

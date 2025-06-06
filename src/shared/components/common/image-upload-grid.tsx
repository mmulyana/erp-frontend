import { AlertCircleIcon, ImageIcon, UploadIcon, XIcon } from 'lucide-react'
import { useEffect } from 'react'

import { maxFiles, maxSize, maxSizeMB } from '@/shared/constants/common'
import { useFileUpload } from '@/shared/hooks/use-file-upload'
import { Button } from '@/shared/components/ui/button'

type Props = {
	onChange?: (files: File[]) => void
}

export default function ImageUploadGrid({ onChange }: Props) {
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
		maxFiles,
		maxSize,
		accept: 'image/*',
	})

	useEffect(() => {
		onChange?.(files.map((f) => f.file as File))
	}, [files, onChange])

	return (
		<>
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
								File terupload ({files.length})
							</h3>
							<div className='flex gap-2 items-center'>
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
									onClick={openFileDialog}
									disabled={files.length >= maxFiles}
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
						<p className='mb-1.5 text-sm font-medium'>Drop your images here</p>
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
		</>
	)
}

import { Button } from '@/components/ui/button'
import { cn } from '@/shared/utils/cn'
import { Image, X } from 'lucide-react'
import { useRef } from 'react'
import { useFormContext, Controller } from 'react-hook-form'

interface ImageUploadProps {
	name: string
	maxSizeMb?: number
}

export const ImageUpload = ({ name, maxSizeMb = 5 }: ImageUploadProps) => {
	const inputRef = useRef<HTMLInputElement | null>(null)
	const { control, setValue, watch } = useFormContext()
	const file = watch(name)

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0]
		if (file) {
			if (file.size / 1024 / 1024 > maxSizeMb) {
				alert(`Ukuran maksimal ${maxSizeMb}MB`)
				return
			}
			setValue(name, file)
		}
	}

	return (
		<Controller
			name={name}
			control={control}
			render={() => (
				<div className='flex items-center gap-4'>
					<div
						className={cn(
							'w-20 h-20 rounded-full border border-dashed border-gray-300 flex items-center justify-center overflow-hidden bg-gray-50 relative',
							file && 'border-none'
						)}
					>
						{file ? (
							<>
								<img
									src={URL.createObjectURL(file)}
									alt='Preview'
									className='object-cover w-full h-full'
								/>
								<button
									onClick={() => setValue(name, null)}
									className='bg-black/20 text-white w-full h-8 absolute bottom-0 left-0 flex items-center justify-center'
								>
									<X size={20} />
								</button>
							</>
						) : (
							<div className='text-gray-400 text-xl'>
								<Image />
							</div>
						)}
					</div>

					<div>
						<input
							type='file'
							accept='image/*'
							ref={inputRef}
							onChange={handleChange}
							className='hidden'
						/>
						<p className='text-ink-light mb-2 text-sm'>
							<span className='text-error'>*</span>maksimal ukuran {maxSizeMb}mb
						</p>
						<Button
							type='button'
							onClick={() => inputRef.current?.click()}
							variant='outline'
						>
							Pilih foto
						</Button>
					</div>
				</div>
			)}
		/>
	)
}

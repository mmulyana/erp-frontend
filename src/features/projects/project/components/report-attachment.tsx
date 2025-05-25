import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useState } from 'react'

import ImageZoom from '@/shared/components/common/image-zoom'
import { Button } from '@/shared/components/ui/button'
import { baseUrl } from '@/shared/constants/urls'

import { useReport } from '../api/report/use-report'

export default function ReportAttachment({ id }: { id?: string }) {
	const { data } = useReport({ id })

	const imagesLength = data?.data?.attachments.length || 0
	const [currentImageIndex, setCurrentImageIndex] = useState(0)

	const nextImage = () => {
		setCurrentImageIndex((prev) => (prev + 1) % imagesLength)
	}

	const prevImage = () => {
		setCurrentImageIndex((prev) => (prev - 1 + imagesLength) % imagesLength)
	}

	if (!imagesLength) return null

	return (
		<div className='flex-1 relative flex items-center justify-center h-[320px] lg:h-full flex-col overflow-hidden bg-red-400'>
			<ImageZoom
				url={`${baseUrl}/${data?.data?.attachments[currentImageIndex].photoUrl}`}
			/>
			<Button
				variant='ghost'
				size='icon'
				className='absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white'
				onClick={prevImage}
			>
				<ChevronLeft className='h-6 w-6' />
			</Button>
			<Button
				variant='ghost'
				size='icon'
				className='absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white'
				onClick={nextImage}
			>
				<ChevronRight className='h-6 w-6' />
			</Button>
			<div className='absolute top-4 left-4 bg-black/80 text-white px-3 py-1 rounded-full text-sm'>
				{currentImageIndex + 1} / {imagesLength}
			</div>
			<div className='bg-black/50 w-full p-2 absolute bottom-0 left-1/2 -translate-x-1/2'>
				<div className='flex gap-2 overflow-x-auto scrollbar-hide'>
					{data?.data?.attachments.map((a, index) => (
						<button
							key={index}
							onClick={() => setCurrentImageIndex(index)}
							className={`flex-shrink-0 relative ${
								index === currentImageIndex
									? ''
									: 'opacity-70 hover:opacity-100'
							} transition-all duration-200`}
						>
							<img
								src={`${baseUrl}/${a.photoUrl}` || '/placeholder.svg'}
								alt={`Thumbnail ${index + 1}`}
								className='w-16 h-12 object-cover rounded'
							/>
						</button>
					))}
				</div>
			</div>
		</div>
	)
}

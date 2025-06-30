import { useState } from 'react'
import { Lightbox } from 'yet-another-react-lightbox'
import Zoom from 'yet-another-react-lightbox/plugins/zoom'
import 'yet-another-react-lightbox/styles.css'

import { baseUrl } from '@/shared/constants/urls'
import { cn } from '@/shared/utils/cn'
import { Image as ImageIcon } from 'lucide-react'

type Props = {
	urls: string[]
	style?: {
		img?: string
		icon?: string
		grid?: string
	}
}

export default function PhotoGrid({ urls, style }: Props) {
	const [isLightboxOpen, setIsLightboxOpen] = useState(false)
	const [currentIndex, setCurrentIndex] = useState(0)

	if (!urls || urls.length === 0) {
		return (
			<div
				className={cn(
					'h-32 w-32 rounded-md bg-gray-200 flex items-center justify-center',
					style?.img
				)}
			>
				<ImageIcon className={cn('text-ink-secondary', style?.icon)} />
			</div>
		)
	}

	const images = urls.map((url) => ({
		src: `${baseUrl}/${url}`,
	}))

	return (
		<>
			<div className={cn('grid grid-cols-2 gap-4 p-2', style?.grid)}>
				{images.map((image, index) => (
					<img
						key={index}
						src={image.src}
						alt={`Image ${index + 1}`}
						onClick={() => {
							setCurrentIndex(index)
							setIsLightboxOpen(true)
						}}
						className={cn(
							'h-32 w-full object-cover rounded-md cursor-pointer',
							style?.img
						)}
					/>
				))}
			</div>

			<Lightbox
				plugins={[Zoom]}
				open={isLightboxOpen}
				close={() => setIsLightboxOpen(false)}
				index={currentIndex}
				slides={images}
			/>
		</>
	)
}

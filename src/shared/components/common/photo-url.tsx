import Zoom from 'yet-another-react-lightbox/plugins/zoom'
import { Lightbox } from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'
import { useState } from 'react'

import { baseUrl } from '@/shared/constants/urls'
import { cn } from '@/shared/utils/cn'
import { Image } from 'lucide-react'

type Props = {
	url: string
	style?: {
		img?: string
		icon?: string
	}
}

export default function PhotoUrl({ url, style }: Props) {
	const [isLightboxOpen, setIsLightboxOpen] = useState(false)

	if (!url) {
		return (
			<div
				className={cn(
					'h-32 w-32 rounded-full bg-gray-200 flex items-center justify-center',
					style?.img
				)}
			>
				<Image className={cn('text-ink-secondary', style?.icon)} />
			</div>
		)
	}

	const imageUrl = `${baseUrl}/${url}`

	return (
		<>
			<img
				src={imageUrl}
				alt='Thumbnail'
				onClick={() => setIsLightboxOpen(true)}
				className={cn(
					'h-32 w-32 cursor-pointer object-cover rounded-full',
					style?.img
				)}
			/>

			<Lightbox
				plugins={[Zoom]}
				open={isLightboxOpen}
				close={() => setIsLightboxOpen(false)}
				slides={[{ src: imageUrl }]}
				render={{
					buttonPrev: () => null,
					buttonNext: () => null,
				}}
			/>
		</>
	)
}

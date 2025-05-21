import { useEffect, useState } from 'react'

type ImagePreviewProps = {
	file: File
	className?: string
}

export default function ImagePreview({ file, className }: ImagePreviewProps) {
	const [previewUrl, setPreviewUrl] = useState<string>()

	useEffect(() => {
		const objectUrl = URL.createObjectURL(file)
		setPreviewUrl(objectUrl)

		return () => {
			URL.revokeObjectURL(objectUrl)
		}
	}, [file])

	if (!file.type.startsWith('image/')) {
		return (
			<div className={`text-sm text-muted-foreground ${className}`}>
				Bukan file gambar
			</div>
		)
	}

	return (
		<img
			src={previewUrl}
			alt='Preview'
			className={className || 'w-20 h-20 object-cover rounded border'}
		/>
	)
}

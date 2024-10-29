// components/PreviewPhoto.tsx
import { X } from 'lucide-react'
import { useEffect, useState } from 'react'

interface PreviewPhotoProps {
  photo: File
  onRemove: () => void
}

export function PreviewPhoto({ photo, onRemove }: PreviewPhotoProps) {
  const [preview, setPreview] = useState<string>('')

  useEffect(() => {
    const url = URL.createObjectURL(photo)
    setPreview(url)
    return () => URL.revokeObjectURL(url)
  }, [photo])

  return (
    <div className='relative'>
      <img
        src={preview}
        alt={photo.name}
        className='w-20 h-20 object-cover rounded-lg'
      />
      <button
        type='button'
        onClick={onRemove}
        className='absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1'
      >
        <X size={14} />
      </button>
    </div>
  )
}

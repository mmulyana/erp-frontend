import { useState, useRef, ChangeEvent, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { ImageIcon, X } from 'lucide-react'

type Props = {
  defaultPreview: string | null
  onUpdate?: (val: File) => void
  onRemove?: () => void
  size?: number
}
export default function PhotoProfile({
  defaultPreview,
  onUpdate,
  onRemove,
  size = 80,
}: Props) {
  const [preview, setPreview] = useState<string | null>(defaultPreview)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (defaultPreview) {
      setPreview(defaultPreview)
    }

    return () => setPreview(null)
  }, [defaultPreview])

  const validateFileSize = (file: File | null) => {
    if (!file) return true
    const maxSize = 5 * 1024 * 1024
    return file.size <= maxSize
  }

  const handlePhotoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      if (validateFileSize(selectedFile)) {
        const reader = new FileReader()
        reader.onloadend = () => {
          setPreview(reader.result as string)
        }
        reader.readAsDataURL(selectedFile)
        onUpdate?.(selectedFile)
        setError(null)
      } else {
        setError('File size must be less than 5MB')
        setPreview(null)
      }
    } else {
      setPreview(null)
      setError(null)
    }
  }

  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  const handleRemovePhoto = () => {
    onRemove?.()
    setPreview(null)
    setError(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <div className='flex items-center space-x-4'>
      <label htmlFor='photo-upload' className='cursor-pointer'>
        {preview ? (
          <img
            src={preview}
            alt='Preview'
            className='rounded-full object-cover'
            style={{
              width: size + 'px',
              height: size + 'px',
            }}
          />
        ) : (
          <div
            className='rounded-full flex justify-center items-center bg-[#EBECEE]'
            style={{
              width: size + 'px',
              height: size + 'px',
            }}
          >
            <ImageIcon className='w-6 h-6 text-dark/70' />
          </div>
        )}
      </label>
      <input
        id='photo-upload'
        type='file'
        accept='image/*'
        className='hidden'
        onChange={handlePhotoChange}
        ref={fileInputRef}
      />
      <div className='space-y-1'>
        <div className='flex gap-2 items-center'>
          <Button type='button' variant='outline' onClick={handleUploadClick}>
            {preview ? 'Ganti photo' : 'Upload Photo'}
          </Button>
          {preview && (
            <Button
              type='button'
              variant='outline'
              className='h-8 w-8 p-0'
              onClick={handleRemovePhoto}
            >
              <X className='w-5 h-5 text-red-primary' />
            </Button>
          )}
        </div>
        <p className='text-sm text-dark/50'>PNG, JPEG max size 5MB</p>
      </div>
      {error && <p className='text-red-500 text-sm'>{error}</p>}
    </div>
  )
}

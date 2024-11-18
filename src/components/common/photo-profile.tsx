import { useState, useRef, ChangeEvent, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { ImageIcon, X } from 'lucide-react'
import { cn } from '@/utils/cn'
import { Lightbox } from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'
import Zoom from 'yet-another-react-lightbox/plugins/zoom'
type Props = {
  defaultPreview: string | null
  onUpdate?: (val: File) => void
  onRemove?: () => void
  size?: number
  className?: string
  disabled?: boolean
}

export default function PhotoProfile({
  defaultPreview,
  onUpdate,
  onRemove,
  size = 80,
  className,
  disabled,
}: Props) {
  const [preview, setPreview] = useState<string | null>(defaultPreview)
  const [error, setError] = useState<string | null>(null)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
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

  const handleImageClick = () => {
    if (preview) {
      setIsLightboxOpen(true)
    }
  }

  return (
    <>
      <div className='flex items-center space-x-4'>
        {preview ? (
          <img
            src={preview}
            alt='Preview'
            className={cn(
              'rounded-full object-cover cursor-pointer',
              className
            )}
            style={{
              width: size + 'px',
              height: size + 'px',
            }}
            onClick={handleImageClick}
          />
        ) : (
          <label
            htmlFor='photo-upload'
            className={cn(
              'rounded-full flex justify-center items-center bg-[#EBECEE] cursor-pointer',
              className
            )}
            style={{
              width: size + 'px',
              height: size + 'px',
            }}
          >
            <ImageIcon className='w-6 h-6 text-dark/70' />
          </label>
        )}
        <input
          id='photo-upload'
          type='file'
          accept='image/*'
          className='hidden'
          onChange={handlePhotoChange}
          ref={fileInputRef}
        />
        {!disabled && (
          <div className='space-y-1'>
            <div className='flex gap-2 items-center'>
              <Button
                type='button'
                variant='outline'
                onClick={handleUploadClick}
              >
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
        )}
        {error && <p className='text-red-500 text-sm'>{error}</p>}
      </div>

      {/* Lightbox Component */}
      <Lightbox
        plugins={[Zoom]}
        open={isLightboxOpen}
        close={() => setIsLightboxOpen(false)}
        slides={preview ? [{ src: preview }] : []}
        render={{
          buttonPrev: () => null,
          buttonNext: () => null,
        }}
      />
    </>
  )
}

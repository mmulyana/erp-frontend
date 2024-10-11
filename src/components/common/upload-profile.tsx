import React, { useRef } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { ImageIcon, X } from 'lucide-react'

type Props = {
  name: string
  preview: string | null
  setPreview: (val: string | null) => void
}

export default function UploadProfile({ name, preview, setPreview }: Props) {
  const { control, setValue } = useFormContext()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const validateFileSize = (file: File | null) => {
    if (!file) return true
    const maxSize = 5 * 1024 * 1024
    return file.size <= maxSize || 'File size must be less than 5MB'
  }

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
      setValue(name, file)
    } else {
      setPreview(null)
      setValue(name, null)
    }
  }

  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <Controller
      control={control}
      name={name}
      rules={{ validate: validateFileSize }}
      render={({ field: { onChange }, fieldState: { error } }) => (
        <div className='flex items-center space-x-4'>
          <label htmlFor='photo-upload' className='cursor-pointer'>
            {preview ? (
              <img
                src={preview}
                alt='Preview'
                className='w-20 h-20 rounded-full object-cover'
              />
            ) : (
              <div className='w-20 h-20 rounded-full flex justify-center items-center bg-[#EBECEE]'>
                <ImageIcon className='w-6 h-6 text-dark/70' />
              </div>
            )}
          </label>
          <input
            id='photo-upload'
            type='file'
            accept='image/*'
            className='hidden'
            onChange={(e) => {
              handlePhotoChange(e)
              onChange(e.target.files?.[0] || null)
            }}
            ref={fileInputRef}
          />
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
                  onClick={() => {
                    setValue(name, null)
                    setPreview(null)
                  }}
                >
                  <X className='w-5 h-5 text-red-primary' />
                </Button>
              )}
            </div>
            <p className='text-sm text-dark/50'>PNG, JPEG under 5MB</p>
          </div>
          {error && <p className='text-red-500 text-sm'>{error.message}</p>}
        </div>
      )}
    />
  )
}

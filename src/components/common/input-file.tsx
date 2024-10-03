import { useFormContext } from 'react-hook-form'
import { FormField } from '../ui/form'
import { Input } from '../ui/input'
import { useState } from 'react'

type Props = {
  name: string
  label: string
}
export default function InputFile({ name, label }: Props) {
  const { control, setValue } = useFormContext()

  const [preview, setPreview] = useState<string | null>(null)

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
      setValue('photo', file)
    } else {
      setPreview(null)
      setValue('photo', null)
    }
  }

  return (
    <>
      <FormField
        label={label}
        control={control}
        name={name}
        rules={{ validate: validateFileSize }}
        render={({
          field: { value, onChange, ...field },
          fieldState: { error },
        }) => (
          <div>
            <Input
              type='file'
              accept='image/*'
              onChange={(e) => {
                handlePhotoChange(e)
                onChange(e.target.files?.[0] || null)
              }}
              {...field}
            />
            {error && (
              <p className='text-red-500 text-sm mt-1'>{error.message}</p>
            )}
            {preview && (
              <img
                src={preview}
                alt='Preview'
                className='mt-2 max-w-xs max-h-40 object-contain'
              />
            )}
          </div>
        )}
      />
    </>
  )
}

import { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { EyeIcon, EyeOffIcon } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { FormLabel } from '../ui/form'

interface PasswordInputProps {
  name: string
  label: string
  placeholder?: string
}

export default function InputPassword({
  name,
  label,
  placeholder = 'Masukkan password',
}: PasswordInputProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext()
  const [showPassword, setShowPassword] = useState(false)

  const togglePasswordVisibility = () => setShowPassword(!showPassword)

  return (
    <div className='space-y-2'>
      <FormLabel
        htmlFor={name}
        className='block text-sm font-medium text-gray-700'
      >
        {label}
      </FormLabel>
      <div className='relative'>
        <Input
          type={showPassword ? 'text' : 'password'}
          id={name}
          placeholder={placeholder}
          {...register(name, {
            required: 'Password harus diisi',
            minLength: {
              value: 8,
              message: 'Password minimal 8 karakter',
            },
          })}
          className='pr-10'
        />
        <Button
          type='button'
          onClick={togglePasswordVisibility}
          className='absolute inset-y-0 flex items-center px-2 top-1/2 -translate-y-1/2 right-1'
          variant='ghost'
        >
          {showPassword ? (
            <EyeOffIcon className='h-4 w-4 text-gray-400' />
          ) : (
            <EyeIcon className='h-4 w-4 text-gray-400' />
          )}
        </Button>
      </div>
      {errors[name] && (
        <p className='mt-1 text-sm text-red-600'>
          {errors[name]?.message as string}
        </p>
      )}
    </div>
  )
}

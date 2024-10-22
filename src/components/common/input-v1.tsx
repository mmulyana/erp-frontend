import { Controller, useFormContext } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { FormLabel } from '../ui/form'

type Props = {
  name: string
  label?: string
  helperText?: string
  suffix?: React.ReactNode
}
export default function InputV1({ name, label, helperText, suffix }: Props) {
  const { control } = useFormContext()

  return (
    <div className='space-y-2'>
      {label && <FormLabel htmlFor={name}>{label}</FormLabel>}
      <div className='relative'>
        <Controller
          control={control}
          name={name}
          render={({ field }) => (
            <Input
              id={name}
              className='peer ps-9 [direction:inherit]'
              {...field}
            />
          )}
        />
        {suffix && (
          <div className='pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50'>
            {suffix}
          </div>
        )}
      </div>
      {helperText && (
        <p
          className='mt-2 text-xs text-muted-foreground'
          role='region'
          aria-live='polite'
        >
          {helperText}
        </p>
      )}
    </div>
  )
}

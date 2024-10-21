import { cn } from '@/utils/cn'
import React from 'react'

interface Props
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'children'> {
  children: (checked?: boolean) => React.ReactNode
  className?: string
  background: string
  customChecked?: React.ReactNode
}

export const RadioV2 = React.forwardRef<HTMLInputElement, Props>(
  (
    { children, className, customChecked, onChange, background, ...props },
    ref
  ) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(event)
    }

    return (
      <label className={cn('cursor-pointer', className)} style={{ background }}>
        <input
          type='radio'
          className='hidden'
          ref={ref}
          {...props}
          checked={props.checked}
          onChange={handleChange}
        />
        <span className='text-sm'>{children(props.checked)}</span>
      </label>
    )
  }
)

RadioV2.displayName = 'RadioV2'

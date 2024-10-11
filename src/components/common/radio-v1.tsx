import React from 'react'
import { cn } from '@/utils/cn'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  children: React.ReactNode
  className?: string
  customChecked?: React.ReactNode
}

export const RadioV1 = React.forwardRef<HTMLInputElement, Props>(
  ({ children, className, ...props }, ref) => {
    return (
      <label
        className={cn(
          'flex items-center cursor-pointer w-full px-3 py-2 rounded-[8px] border border-line justify-between',
          props.checked && 'border-blue-primary'
        )}
      >
        <input type='radio' className='hidden' ref={ref} {...props} />
        <span className='text-sm'>{children}</span>
        {props.checked && (
          <>
            {!!props.customChecked ? (
              props.customChecked
            ) : (
              <span className='w-2.5 h-2.5 bg-blue-primary rounded-full' />
            )}
          </>
        )}
      </label>
    )
  }
)

RadioV1.displayName = 'RadioV1'

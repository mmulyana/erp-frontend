import { cn } from '@/utils/cn'
import React from 'react'

export const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('border border-[#EFF0F2] rounded-lg', className)}
    {...props}
  />
))
Card.displayName = 'Card'

type HeadProps = React.PropsWithChildren & {
  className?: string
}
export function CardHead({ children, className }: HeadProps) {
  return (
    <div
      className={cn(
        'px-4 h-10 flex justify-between items-center border-b border-[#EFF0F2]',
        className
      )}
    >
      {children}
    </div>
  )
}

export function CardBody({ children, className }: HeadProps) {
  return <div className={cn('p-4', className)}>{children}</div>
}

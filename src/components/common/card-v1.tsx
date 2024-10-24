import { cn } from '@/utils/cn'
import React from 'react'

type CardProps = React.PropsWithChildren & {
  className?: string
}
export function Card({ className, children }: CardProps) {
  return (
    <div className={cn('border border-[#EFF0F2] rounded-lg', className)}>
      {children}
    </div>
  )
}

type HeadProps = React.PropsWithChildren & {
  className?: string
}
export function CardHead({ children, className }: HeadProps) {
  return (
    <div
      className={cn('px-4 h-10 flex justify-between items-center border-b border-[#EFF0F2]', className)}
    >
      {children}
    </div>
  )
}

export function CardBody({ children, className }: HeadProps) {
  return <div className={cn('p-4', className)}>{children}</div>
}

import { cn } from '@/shared/utils/cn'
import { useState } from 'react'

type Props = {
  children: React.ReactNode
  overlay?: React.ReactNode
  className?: string
}
export default function Overlay({ children, overlay, className }: Props) {
  const [isShow, setIsSHow] = useState(false)

  return (
    <div
      className={cn('relative w-full', className)}
      onMouseEnter={() => setIsSHow(true)}
      onMouseLeave={() => setIsSHow(false)}
    >
      {children}
      {isShow && overlay}
    </div>
  )
}

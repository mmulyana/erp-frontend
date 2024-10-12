import { cn } from '@/utils/cn'
import React from 'react'

export default function TitlePage({
  children,
  className,
}: React.PropsWithChildren & { className?: string }) {
  return (
    <div
      className={cn(
        'w-full h-12 flex items-center px-4 justify-between',
        className
      )}
    >
      {children}
    </div>
  )
}

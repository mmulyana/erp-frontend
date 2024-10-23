import { cn } from '@/utils/cn'
import React from 'react'

interface DataSheetProps {
  width?: number
  children: React.ReactNode
  className?: string
}

export default function DataSheet({
  children,
  width,
  className,
}: DataSheetProps) {
  return (
    <div className={cn('flex gap-2 items-center', className)}>
      <div
        className='w-[140px] flex-shrink-0'
        style={{ width: width ? `${width}px` : undefined }}
      >
        {Array.isArray(children) ? children[0] : null}
      </div>
      <div className='flex-grow'>
        {Array.isArray(children) ? children[1] : null}
      </div>
    </div>
  )
}

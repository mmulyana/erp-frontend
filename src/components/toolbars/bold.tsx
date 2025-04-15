'use client'

import { BoldIcon } from 'lucide-react'
import React from 'react'

import { Button, type ButtonProps } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { cn } from '@/shared/utils/cn'
import { useToolbar } from '@/components/toolbars/toolbar-provider'

const BoldToolbar = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, onClick, children, ...props }, ref) => {
    const { editor } = useToolbar()
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            type='button'
            variant='ghost'
            size='icon'
            className={cn(
              'h-6 w-6',
              editor?.isActive('bold') && 'bg-accent',
              className
            )}
            onClick={(e) => {
              editor?.chain().focus().toggleBold().run()
              onClick?.(e)
            }}
            disabled={!editor?.can().chain().focus().toggleBold().run()}
            ref={ref}
            {...props}
          >
            {children || <BoldIcon size={14} />}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <span>Bold</span>
          <span className='ml-1 text-xs text-gray-11'>(cmd + b)</span>
        </TooltipContent>
      </Tooltip>
    )
  }
)

BoldToolbar.displayName = 'BoldToolbar'

export { BoldToolbar }

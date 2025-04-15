'use client'

import { ItalicIcon } from 'lucide-react'
import React from 'react'

import { Button, type ButtonProps } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { cn } from '@/shared/utils/cn'
import { useToolbar } from '@/components/toolbars/toolbar-provider'

const ItalicToolbar = React.forwardRef<HTMLButtonElement, ButtonProps>(
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
              editor?.isActive('italic') && 'bg-accent',
              className
            )}
            onClick={(e) => {
              editor?.chain().focus().toggleItalic().run()
              onClick?.(e)
            }}
            disabled={!editor?.can().chain().focus().toggleItalic().run()}
            ref={ref}
            {...props}
          >
            {children || <ItalicIcon size={14} />}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <span>Italic</span>
          <span className='ml-1 text-xs text-gray-11'>(cmd + i)</span>
        </TooltipContent>
      </Tooltip>
    )
  }
)

ItalicToolbar.displayName = 'ItalicToolbar'

export { ItalicToolbar }

'use client'

import { TextQuote } from 'lucide-react'
import React from 'react'

import { Button, type ButtonProps } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { cn } from '@/shared/utils/cn'
import { useToolbar } from '@/components/toolbars/toolbar-provider'

const BlockquoteToolbar = React.forwardRef<HTMLButtonElement, ButtonProps>(
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
              editor?.isActive('blockquote') && 'bg-accent',
              className
            )}
            onClick={(e) => {
              editor?.chain().focus().toggleBlockquote().run()
              onClick?.(e)
            }}
            disabled={!editor?.can().chain().focus().toggleBlockquote().run()}
            ref={ref}
            {...props}
          >
            {children || <TextQuote size={14} />}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <span>Blockquote</span>
        </TooltipContent>
      </Tooltip>
    )
  }
)

BlockquoteToolbar.displayName = 'BlockquoteToolbar'

export { BlockquoteToolbar }

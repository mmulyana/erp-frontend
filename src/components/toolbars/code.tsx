'use client'

import { Code2 } from 'lucide-react'
import React from 'react'

import { Button, type ButtonProps } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { cn } from '@/shared/utils/cn'
import { useToolbar } from '@/components/toolbars/toolbar-provider'

const CodeToolbar = React.forwardRef<HTMLButtonElement, ButtonProps>(
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
              editor?.isActive('code') && 'bg-accent',
              className
            )}
            onClick={(e) => {
              editor?.chain().focus().toggleCode().run()
              onClick?.(e)
            }}
            disabled={!editor?.can().chain().focus().toggleCode().run()}
            ref={ref}
            {...props}
          >
            {children || <Code2 size={14} />}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <span>Code</span>
        </TooltipContent>
      </Tooltip>
    )
  }
)

CodeToolbar.displayName = 'CodeToolbar'

export { CodeToolbar }

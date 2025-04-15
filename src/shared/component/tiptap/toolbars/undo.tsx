'use client'

import { CornerUpLeft } from 'lucide-react'
import React from 'react'

import { Button, type ButtonProps } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { cn } from '@/shared/utils/cn'
import { useToolbar } from '@/components/toolbars/toolbar-provider'

const UndoToolbar = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, onClick, children, ...props }, ref) => {
    const { editor } = useToolbar()

    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            type='button'
            variant='ghost'
            size='icon'
            className={cn('h-6 w-6', className)}
            onClick={(e) => {
              editor?.chain().focus().undo().run()
              onClick?.(e)
            }}
            disabled={!editor?.can().chain().focus().undo().run()}
            ref={ref}
            {...props}
          >
            {children || <CornerUpLeft size={14} />}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <span>Redo</span>
        </TooltipContent>
      </Tooltip>
    )
  }
)

UndoToolbar.displayName = 'UndoToolbar'

export { UndoToolbar }

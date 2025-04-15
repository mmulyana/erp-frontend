'use client'

import { SeparatorHorizontal } from 'lucide-react'
import React from 'react'

import { Button, type ButtonProps } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { cn } from '@/shared/utils/cn'
import { useToolbar } from '@/components/toolbars/toolbar-provider'

const HorizontalRuleToolbar = React.forwardRef<HTMLButtonElement, ButtonProps>(
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
              editor?.chain().focus().setHorizontalRule().run()
              onClick?.(e)
            }}
            ref={ref}
            {...props}
          >
            {children || <SeparatorHorizontal size={14} />}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <span>Horizontal Rule</span>
        </TooltipContent>
      </Tooltip>
    )
  }
)

HorizontalRuleToolbar.displayName = 'HorizontalRuleToolbar'

export { HorizontalRuleToolbar }

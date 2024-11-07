'use client'

import { ListOrdered } from 'lucide-react'
import React from 'react'

import { Button, type ButtonProps } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { cn } from '@/utils/cn'
import { useToolbar } from '@/components/toolbars/toolbar-provider'

const OrderedListToolbar = React.forwardRef<HTMLButtonElement, ButtonProps>(
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
              editor?.isActive('orderedList') && 'bg-accent',
              className
            )}
            onClick={(e) => {
              editor?.chain().focus().toggleOrderedList().run()
              onClick?.(e)
            }}
            disabled={!editor?.can().chain().focus().toggleOrderedList().run()}
            ref={ref}
            {...props}
          >
            {children || <ListOrdered size={14} />}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <span>Ordered list</span>
        </TooltipContent>
      </Tooltip>
    )
  }
)

OrderedListToolbar.displayName = 'OrderedListToolbar'

export { OrderedListToolbar }

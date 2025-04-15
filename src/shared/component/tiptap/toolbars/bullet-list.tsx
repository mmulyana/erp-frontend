'use client'

import { List } from 'lucide-react'
import React from 'react'

import { Button, type ButtonProps } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { cn } from '@/shared/utils/cn'
import { useToolbar } from '@/components/toolbars/toolbar-provider'

const BulletListToolbar = React.forwardRef<HTMLButtonElement, ButtonProps>(
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
              editor?.isActive('bulletList') && 'bg-accent',
              className
            )}
            onClick={(e) => {
              editor?.chain().focus().toggleBulletList().run()
              onClick?.(e)
            }}
            disabled={!editor?.can().chain().focus().toggleBulletList().run()}
            ref={ref}
            {...props}
          >
            {children || <List size={14} />}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <span>Bullet list</span>
        </TooltipContent>
      </Tooltip>
    )
  }
)

BulletListToolbar.displayName = 'BulletListToolbar'

export { BulletListToolbar }

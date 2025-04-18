'use client'

import { WrapText } from 'lucide-react'
import React from 'react'

import { Button, type ButtonProps } from '@/shared/components/ui/button'
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from '@/shared/components/ui/tooltip'
import { cn } from '@/shared/utils/cn'

import { useToolbar } from './toolbar-provider'

const HardBreakToolbar = React.forwardRef<HTMLButtonElement, ButtonProps>(
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
							editor?.chain().focus().setHardBreak().run()
							onClick?.(e)
						}}
						ref={ref}
						{...props}
					>
						{children || <WrapText size={14} />}
					</Button>
				</TooltipTrigger>
				<TooltipContent>
					<span>Hard break</span>
				</TooltipContent>
			</Tooltip>
		)
	}
)

HardBreakToolbar.displayName = 'HardBreakToolbar'

export { HardBreakToolbar }

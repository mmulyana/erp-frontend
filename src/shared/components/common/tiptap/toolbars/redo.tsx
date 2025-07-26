'use client'

import { CornerUpRight } from 'lucide-react'
import React from 'react'

import { Button, type ButtonProps } from '@/shared/components/ui/button'
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from '@/shared/components/ui/tooltip'
import { cn } from '@/shared/utils/cn'

import { useToolbar } from './toolbar-provider'

const RedoToolbar = React.forwardRef<HTMLButtonElement, ButtonProps>(
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
							editor?.chain().focus().redo().run()
							onClick?.(e)
						}}
						disabled={!editor?.can().chain().focus().redo().run()}
						ref={ref}
						{...props}
					>
						{children || <CornerUpRight size={14} />}
					</Button>
				</TooltipTrigger>
				<TooltipContent>
					<span>Redo</span>
				</TooltipContent>
			</Tooltip>
		)
	}
)

RedoToolbar.displayName = 'RedoToolbar'

export { RedoToolbar }

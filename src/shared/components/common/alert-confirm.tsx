import { ReactNode, useState } from 'react'

import { Button } from '@/shared/components/ui/button'
import { cn } from '@/shared/utils/cn'
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/shared/components/ui/alert-dialog'

type AlertConfirmProps = {
	triggerLabel: string
	description?: string
	title?: string
	onConfirm: () => void
	variant?: 'default' | 'error'
	triggerClassName?: string
	children?: ReactNode
}

export function AlertConfirm({
	triggerLabel,
	description = 'Tindakan ini tidak dapat dibatalkan.',
	title = 'Yakin ingin melanjutkan tindakan ini?',
	onConfirm,
	variant = 'default',
	triggerClassName,
	children,
}: AlertConfirmProps) {
	const [open, setOpen] = useState(false)

	return (
		<AlertDialog open={open} onOpenChange={setOpen}>
			<AlertDialogTrigger asChild>
				<Button
					variant='ghost'
					className={cn(
						'text-error hover:text-white hover:bg-error px-2.5',
						triggerClassName
					)}
					type='button'
				>
					{triggerLabel}
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>{title}</AlertDialogTitle>
					<AlertDialogDescription>{description}</AlertDialogDescription>
					{children}
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Batal</AlertDialogCancel>
					<AlertDialogAction
						className={variant === 'error' ? 'bg-error text-white' : ''}
						onClick={() => {
							onConfirm()
							setOpen(false)
						}}
					>
						Lanjut
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}

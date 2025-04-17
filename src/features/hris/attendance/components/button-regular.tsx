import { Check, X } from 'lucide-react'

import { Button } from '@/shared/components/ui/button'
import { cn } from '@/shared/utils/cn'

type Props = {
	variant: 'presence' | 'absent'
	status: 'presence' | 'absent' | null
	onClick: () => void
}

const config = {
	presence: {
		label: 'Hadir',
		icon: Check,
		bg: 'bg-success border-success hover:bg-teal-600 hover:border-teal-800',
		color: 'text-success',
	},
	absent: {
		label: 'Absen',
		icon: X,
		bg: 'bg-error border-error hover:bg-red-400',
		color: 'text-error',
	},
}

export default function ButtonRegular({ variant, status, onClick }: Props) {
	const isActive = variant === status
	const { label, icon: Icon, bg, color } = config[variant]

	return (
		<Button
			variant='outline'
			className={cn('group', isActive && bg)}
			onClick={onClick}
		>
			<Icon
				size={18}
				strokeWidth={3}
				className={cn(color, isActive && 'text-white')}
			/>
			<span
				className={cn(
					'px-0.5 text-sm text-ink-secondary',
					isActive && 'text-white'
				)}
			>
				{label}
			</span>
		</Button>
	)
}

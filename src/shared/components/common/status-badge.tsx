import { Badge } from '@/shared/components/ui/badge'
import { BadgeOption } from '@/shared/types'

type Props = {
	value?: string
	options: BadgeOption[]
}

export default function StatusBadge({ value, options }: Props) {
	const matched = options.find((opt) => opt.value === value)

	if (!matched) return null

	return (
		<Badge variant='outline'>
			<div
				className='h-1.5 w-1.5 rounded-full'
				style={{ background: matched.color }}
			></div>
			<span
				className='px-1 text-sm font-normal text-nowrap'
				style={{ color: matched.color }}
			>
				{matched.label}
			</span>
		</Badge>
	)
}

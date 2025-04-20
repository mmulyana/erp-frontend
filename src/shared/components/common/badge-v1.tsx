import { cn } from '@/shared/utils/cn'
import { Badge } from '../ui/badge'

type props = {
	variant: 'default' | 'danger'
	text: string
}
export default function BadgeV1({ variant = 'default', text }: props) {
	return (
		<Badge
			className={cn(
				'bg-transparent border-success',
				variant == 'danger' && 'border-error'
			)}
		>
			<span className={cn('text-success', variant == 'danger' && 'text-error')}>
				{text}
			</span>
		</Badge>
	)
}

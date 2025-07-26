import { cn } from '../../utils/cn'

type Props = {
	title: string
	value?: number | string
	style?: {
		wrapper?: string
		title?: string
		value?: string
	}
}
export default function CardData({ title, value, style }: Props) {
	return (
		<div
			className={cn(
				'border-l border-border flex flex-col pl-2 justify-center',
				style?.wrapper
			)}
		>
			<p className={cn('text-ink-primary/50 text-sm', style?.title)}>{title}</p>
			<p className={cn('text-ink-primary font-medium', style?.value)}>
				{value}
			</p>
		</div>
	)
}

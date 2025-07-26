import { cn } from '@/shared/utils/cn'

type Props = {
	className?: string
	textStyle?: string
	text?: string
	styleImg?: string
}
export default function EmptyState({
	className,
	textStyle,
	text = 'Masih kosong',
	styleImg,
}: Props) {
	return (
		<div
			className={cn(
				'w-full h-fit pt-4 pb-5 flex justify-center items-center flex-col',
				className
			)}
		>
			<img
				src='/icons/empty-box.png'
				className={cn('w-20 aspect-square', styleImg)}
			/>
			<p className={cn('text-ink-secondary text-sm mt-2', textStyle)}>{text}</p>
		</div>
	)
}

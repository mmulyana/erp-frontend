import { cn } from '@/shared/utils/cn'

type Props = {
	className?: string
	textStyle?: string
	text?: string
}
export default function EmptyState({
	className,
	textStyle,
	text = 'Masih kosong',
}: Props) {
	return (
		<div
			className={cn(
				'w-full h-fit pt-4 pb-5 flex justify-center items-center flex-col',
				className
			)}
		>
			<img src='/icons/empty-box.png' className='w-20 aspect-square' />
			<p className={cn('text-ink-secondary text-sm mt-2', textStyle)}>
				{text}
			</p>
		</div>
	)
}

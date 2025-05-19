import { cn } from '@/shared/utils/cn'
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card'

type props = {
	icon?: React.ReactNode
	title?: string
	children?: React.ReactNode
	footer?: React.ReactNode
	action?: React.ReactNode
	style?: {
		card?: string
		content?: string
	}
}

export default function CardV1({
	icon,
	title,
	children,
	footer,
	action,
	style,
}: props) {
	return (
		<Card
			className={cn(
				'p-0 rounded-xl border border-border shadow-none',
				style?.card
			)}
		>
			<div className='pl-4 pr-6 pt-4 flex justify-between items-start w-full'>
				<div className='flex gap-1 items-center flex-1'>
					{icon && (
						<div className='h-8 w-8 flex items-center justify-center'>
							{icon}
						</div>
					)}
					<p className='text-ink-primary text-nowrap font-medium text-[15px]'>
						{title}
					</p>
				</div>
				<div className='flex-1 h-fit flex justify-end'>{action}</div>
			</div>
			<CardContent className={cn('px-6', footer && 'p-0 ', style?.content)}>
				{children}
			</CardContent>
			{footer && <CardFooter className='px-4 pb-4'>{footer}</CardFooter>}
		</Card>
	)
}

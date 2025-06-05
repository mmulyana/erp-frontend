import { cn } from '@/shared/utils/cn'
import { Card, CardContent, CardFooter } from '../ui/card'
import { Badge } from '../ui/badge'

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
	count?: number
}

export default function CardV1({
	icon,
	title,
	children,
	footer,
	action,
	style,
	count,
}: props) {
	return (
		<Card
			className={cn(
				'p-0 rounded-xl border border-border shadow-none',
				style?.card
			)}
		>
			<div className='pl-4 pr-6 pt-4 flex justify-between items-start w-full flex-wrap'>
				<div className='flex gap-1 items-center flex-1'>
					{icon && (
						<div className='h-8 w-8 flex items-center justify-center'>
							{icon}
						</div>
					)}
					<p className='text-ink-primary text-nowrap font-medium text-[15px]'>
						{title}
					</p>
					{count && (
						<Badge
							variant='secondary'
							className='bg-[#E3E3E3] px-2.5 ml-1 py-0 h-fit leading-none text-[15px] rounded-lg'
						>
							{count}
						</Badge>
					)}
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

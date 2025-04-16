import { TrendingDown, TrendingUp } from 'lucide-react'

import { Card, CardContent, CardTitle } from '@/shared/components/ui/card'
import { cn } from '@/shared/utils/cn'

type Props = {
	title: string
	value: number
	footer?: {
		percent: number
		text: string
	}
}
export default function CardHighlight({ title, footer, value }: Props) {
	return (
		<Card className='h-fit p-6'>
			<CardTitle className='text-ink-secondary text-base font-normal'>
				{title}
			</CardTitle>
			<CardContent className='h-fit p-0 pt-8'>
				<p className='text-ink-primary text-4xl font-medium'>{value}</p>
				{footer && (
					<div className='flex items-center gap-2 mt-4'>
						{footer.percent > 0 ? (
							<TrendingUp strokeWidth={2} size={16} className='text-success' />
						) : (
							<TrendingDown strokeWidth={2} size={16} className='text-error' />
						)}
						<p className='text-ink-light text-sm'>
							<span
								className={cn(
									footer.percent > 0 ? 'text-success' : 'text-error'
								)}
							>
								{footer.percent}%{' '}
							</span>
							{footer.text}
						</p>
					</div>
				)}
			</CardContent>
		</Card>
	)
}

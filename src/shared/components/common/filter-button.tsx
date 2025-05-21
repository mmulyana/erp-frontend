import { Filter } from 'lucide-react'

import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { cn } from '@/shared/utils/cn'

type props = {
	children?: React.ReactNode
	style?: {
		content?: string
	}
}
export default function FilterButton({ children, style }: props) {
	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button variant='outline'>
					<Filter size={18} className='stroke-ink-primary' />
					<span className='px-0.5 text-ink-primary/50'>Filter</span>
				</Button>
			</PopoverTrigger>
			<PopoverContent className={cn('space-y-4 px-4', style?.content)}>
				{children}
			</PopoverContent>
		</Popover>
	)
}

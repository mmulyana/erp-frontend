import { ListFilter } from 'lucide-react'

import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'

type props = {
	children?: React.ReactNode
	style?: {
		content?: string
		trigger?: string
	}
}
export default function SortButton({ children, style }: props) {
	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button variant='outline' className={style?.trigger}>
					<ListFilter size={18} className='stroke-ink-primary' />
					<span className='px-0.5 text-ink-primary/50'>Sort</span>
				</Button>
			</PopoverTrigger>
			<PopoverContent className={style?.content}>{children}</PopoverContent>
		</Popover>
	)
}

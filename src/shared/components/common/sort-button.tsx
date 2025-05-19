import { ListFilter } from 'lucide-react'

import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'

type props = {
	children?: React.ReactNode
}
export default function SortButton({ children }: props) {
	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button variant='outline'>
					<ListFilter size={18} className='stroke-ink-primary' />
					<span className='px-0.5 text-ink-primary/50'>Sort</span>
				</Button>
			</PopoverTrigger>
			<PopoverContent>{children}</PopoverContent>
		</Popover>
	)
}

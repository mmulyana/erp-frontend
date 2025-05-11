import { Filter } from 'lucide-react'

import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'

type props = {
	children?: React.ReactNode
}
export default function FilterButton({ children }: props) {
	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button variant='outline'>
					<Filter size={18} className='stroke-ink-primary' />
					<span className='px-0.5 text-ink-primary/50'>Filter</span>
				</Button>
			</PopoverTrigger>
			<PopoverContent>{children}</PopoverContent>
		</Popover>
	)
}

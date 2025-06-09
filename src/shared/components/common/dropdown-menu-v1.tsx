import { MoreHorizontal } from 'lucide-react'

import { Button } from '@/shared/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu'
import { cn } from '@/shared/utils/cn'

export default function DropdownMenuV1({
	children,
	style,
}: {
	style?: {
		content?: string
		trigger?: string
	}
	children?: React.ReactNode
}) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant='outline'
					size='sm'
					className={cn('h-8 w-8 p-0', style?.trigger)}
				>
					<MoreHorizontal className='h-4 w-4' />
					<span className='sr-only'>Buka</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align='end' className={style?.content}>
				{children}
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

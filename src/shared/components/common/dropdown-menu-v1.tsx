import { MoreHorizontal } from 'lucide-react'

import { Button } from '@/shared/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu'

export default function DropdownMenuV1({
	children,
	style,
}: {
	style?: {
		content?: string
	}
	children?: React.ReactNode
}) {
	return (
		<div className='flex justify-center p-8'>
			<div className='relative'>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant='outline' size='sm' className='h-8 w-8 p-0'>
							<MoreHorizontal className='h-4 w-4' />
							<span className='sr-only'>Buka</span>
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align='end' className={style?.content}>
						{children}
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</div>
	)
}

import { Pencil } from 'lucide-react'

import { ScrollArea } from '@/shared/components/ui/scroll-area'
import { Button } from '@/shared/components/ui/button'
import { Card } from '@/shared/components/ui/card'

export default function ProjectAssignedEmployees({ id }: { id?: string }) {
	return (
		<Card className='p-0 overflow-hidden'>
			<div className='flex items-center justify-between px-6 pt-6'>
				<p className='text-ink-primary'>Pegawai</p>
				<Button variant='outline' className='gap-2'>
					<Pencil size={16} />
					<span className='px-0.5'>Edit</span>
				</Button>
			</div>
			<ScrollArea className='h-[280px] px-6 pt-2'>
				<div className='flex flex-col gap-4'>
					{[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i, index) => (
						<div key={index} className='flex justify-between items-center'>
							<div className='flex gap-2 items-center'>
								<div className='h-10 w-10 rounded-full bg-gray-200'></div>
								<div>
									<p className='text-ink-secondary'>Ahmad</p>
									<p className='text-ink-light text-sm -mt-1.5'>Tukang</p>
								</div>
							</div>
							<p className='text-ink-light'>12/10/2024</p>
						</div>
					))}
				</div>
			</ScrollArea>
		</Card>
	)
}

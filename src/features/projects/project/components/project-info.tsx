import { Badge } from '@/shared/components/ui/badge'
import { Button } from '@/shared/components/ui/button'
import { Card } from '@/shared/components/ui/card'
import { CalendarDays, Clock, Pencil } from 'lucide-react'

export default function ProjectInfo({ id }: { id?: string }) {
	return (
		<Card className='p-6 pt-5 h-fit'>
			<div className='flex justify-between items-start'>
				<p className='text-ink-primary text-xl font-medium'>WWTP Brick wall</p>
				<Button variant='outline' className='gap-2'>
					<Pencil size={16} />
					<span className='px-0.5'>Edit</span>
				</Button>
			</div>
			<div className='flex flex-wrap gap-4 mt-6'>
				<div className='flex gap-2 items-center flex-wrap'>
					<CalendarDays size={16} className='text-ink-light' />
					<p>1 Oktober 2024</p>
					<Badge variant='secondary' className='text-xs text-ink-secondary'>
						30 hari
					</Badge>
				</div>
				<div className='flex gap-2 items-center flex-wrap'>
					<Clock size={16} className='text-ink-light' />
					<p>1 Oktober 2024</p>
					<Badge variant='secondary' className='text-xs text-ink-secondary'>
						30 hari
					</Badge>
				</div>
			</div>
			<div className='mt-4'>
				<p className='text-ink-light text-sm'>Deskripsi</p>
				<p className='text-ink-secondary'>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate
					minima commodi non sapiente enim, quasi mollitia earum repudiandae
					illo cum placeat nesciunt eveniet ut tempore voluptatem quas animi,
					modi quo?
				</p>
			</div>
		</Card>
	)
}

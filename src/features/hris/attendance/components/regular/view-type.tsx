import { LayoutGrid, TableProperties } from 'lucide-react'

import { useLocalStorage } from '@/shared/hooks/use-localstorage'
import { Button } from '@/shared/components/ui/button'
import { cn } from '@/shared/utils/cn'

export default function ViewType() {
	const [view, setView] = useLocalStorage<string>('view-type', 'table')

	return (
		<div className='flex gap-2 items-center'>
			<div className='flex gap-1 p-1 bg-surface rounded-[8px]'>
				<Button
					className={cn(
						'py-0.5 px-1.5 rounded-[5px] flex gap-1 items-center h-fit hover:bg-white/90 hover:shadow-sm',
						view === 'table' && 'bg-white shadow-md !text-ink-primary'
					)}
					variant='ghost'
					onClick={() => setView('table')}
				>
					<TableProperties
						size={16}
						className={cn('text-ink-light rotate-180 stroke-[#47AF97]')}
					/>
					<p
						className={cn(
							'text-ink-light',
							view === 'table' && 'text-ink-secondary'
						)}
					>
						Tabel
					</p>
				</Button>
				<Button
					className={cn(
						'py-0.5 px-1.5 rounded-[5px] flex gap-1 items-center h-fit hover:bg-white/90 hover:shadow-sm',
						view === 'grid' && 'bg-white shadow-md !text-ink-primary'
					)}
					variant='ghost'
					onClick={() => setView('grid')}
				>
					<LayoutGrid
						size={16}
						className={cn('text-ink-light fill-[#E6AA49] stroke-none')}
					/>
					<p
						className={cn(
							'text-ink-light',
							view === 'grid' && 'text-ink-secondary'
						)}
					>
						Grid
					</p>
				</Button>
			</div>
		</div>
	)
}

import { Button } from '@/shared/components/ui/button'
import { useLocalStorage } from '@/shared/hooks/use-localstorage'
import { cn } from '@/shared/utils/cn'
import { LayoutGrid, TableProperties } from 'lucide-react'

export default function ViewType() {
	const [view, setView] = useLocalStorage<string>('view-type', 'table')

	return (
		<div className='flex gap-2 items-center'>
			<div className='flex gap-1 px-1.5 py-[5px] bg-surface rounded-xl'>
				<Button
					className={cn(
						'py-0.5 px-1.5 rounded-lg flex gap-1 items-center h-fit hover:bg-white/90 hover:shadow-sm',
						view === 'table' && 'bg-white shadow-md !text-ink-primary'
					)}
					variant='ghost'
					onClick={() => setView('table')}
				>
					<TableProperties
						size={16}
						className={cn(
							'text-ink-light rotate-180',
							view === 'table' && 'stroke-amber-600'
						)}
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
						'py-0.5 px-1.5 rounded-lg flex gap-1 items-center h-fit hover:bg-white/90 hover:shadow-sm',
						view === 'grid' && 'bg-white shadow-md !text-ink-primary'
					)}
					variant='ghost'
					onClick={() => setView('grid')}
				>
					<LayoutGrid
						size={16}
						className={cn(
							'text-ink-light fill-gray-400 stroke-none',
							view === 'grid' && 'fill-cyan-400'
						)}
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

import { useEffect, useState } from 'react'
import { Button } from '../../ui/button'
import { Search } from 'lucide-react'
import SpotlightModal from './spotlight-modal'

export function SpotlightSearch() {
	const [open, setOpen] = useState(false)

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
				e.preventDefault()
				setOpen(true)
			}
		}

		document.addEventListener('keydown', handleKeyDown)
		return () => document.removeEventListener('keydown', handleKeyDown)
	}, [])

	return (
		<>
			<Button
				variant='outline'
				className='relative w-full max-w-lg justify-start text-ink-primary/50'
				onClick={() => setOpen(true)}
			>
				<Search className='h-4 w-4 mr-2' />
				<span className='text-sm mr-4'>Cari</span>
				<div className='ml-auto flex items-center gap-1'>
					<kbd className='pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100'>
						Ctrl + K
					</kbd>
				</div>
			</Button>
			<SpotlightModal open={open} onOpenChange={setOpen} />
		</>
	)
}

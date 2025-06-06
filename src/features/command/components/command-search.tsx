import { useEffect, useState } from 'react'
import { Search } from 'lucide-react'

import { Button } from '@/shared/components/ui/button'
import { cn } from '@/shared/utils/cn'

import CommandModal from './command-modal'

export function CommandSearch({ className }: { className?: string }) {
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
				className={cn(
					'relative w-8 p-0 md:px-2 md:w-full md:max-w-36 justify-start text-ink-primary rounded-full md:rounded-md',
					className
				)}
				onClick={() => setOpen(true)}
			>
				<Search className='h-5 w-5 md:h-4 md:w-4 mx-auto' />
				<span className='text-sm mr-4 hidden md:block'>Cari</span>
				<div className='ml-auto items-center gap-1 hidden md:flex'>
					<kbd className='pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100'>
						Ctrl + K
					</kbd>
				</div>
			</Button>
			<CommandModal open={open} onOpenChange={setOpen} />
		</>
	)
}

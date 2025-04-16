import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/shared/components/ui/select'
import { cn } from '@/shared/utils/cn'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { parseAsInteger, useQueryStates } from 'nuqs'

type PaginationBarProps = {
	totalItems: number
	totalPages: number
}

export function Pagination({ totalItems, totalPages }: PaginationBarProps) {
	const [query, setQuery] = useQueryStates({
		page: parseAsInteger.withDefault(1),
		limit: parseAsInteger.withDefault(10),
	})

	const currentPage = query.page || 1
	const perPage = query.limit || 10

	const from = (currentPage - 1) * perPage + 1
	const currentPageCount = Math.min(perPage, totalItems - from + 1)
	const to = from + currentPageCount - 1

	const getPageNumbers = () => {
		const pages = []
		const delta = 1
		for (let i = 1; i <= totalPages; i++) {
			if (
				i === 1 ||
				i === totalPages ||
				(i >= currentPage - delta && i <= currentPage + delta)
			) {
				pages.push(i)
			} else if (i === 2 || i === totalPages - 1) {
				pages.push('...')
			}
		}
		return pages
	}

	return (
		<div className='w-full flex justify-between items-center px-2 py-2'>
			<p className='text-ink-primary'>
				{from}-{to} <span className='text-ink-light'>dari</span> {totalItems}
			</p>

			<nav className='flex items-center gap-2'>
				<button
					onClick={() => setQuery({ page: currentPage - 1 })}
					disabled={currentPage === 1}
					className={cn(
						'w-8 h-8 flex justify-center items-center border rounded-md border-[#D4D7DF]',
						currentPage === 1
							? 'bg-transparent border-transparent text-[#747C94]/50'
							: 'bg-white text-[#747C94]'
					)}
				>
					<ChevronLeft className='text-ink-secondary/80' size={18} strokeWidth={3.2} />
				</button>
				<ul className='flex'>
					{getPageNumbers().map((number, index) => (
						<li key={index}>
							<button
								className={cn(
									'w-8 h-8 flex justify-center items-center border text-base rounded-md select-none',
									currentPage === number
										? 'border-brand text-brand rounded-none'
										: number === '...'
										? 'border-border rounded-none border-l-0 text-muted-foreground'
										: 'border-border rounded-none border-l-0 hover:bg-white hover:border-[#D4D7DF]',
									index === 0 && 'rounded-r-none rounded-l-md border-l',
									index + 1 == getPageNumbers().length && 'rounded-r-md'
								)}
								onClick={() => {
									if (typeof number === 'number') {
										setQuery({ page: number })
									}
								}}
								disabled={number === '...'}
							>
								{number}
							</button>
						</li>
					))}
				</ul>
				<button
					onClick={() => setQuery({ page: currentPage + 1 })}
					disabled={currentPage === totalPages}
					className={cn(
						'w-8 h-8 flex justify-center items-center border rounded-md border-[#D4D7DF]',
						currentPage === totalPages
							? 'bg-transparent border-transparent text-[#747C94]/50'
							: 'bg-white text-[#747C94]'
					)}
				>
					<ChevronRight className='text-ink-secondary/80' size={18} strokeWidth={3.2} />
				</button>
			</nav>

			<div className='flex items-center gap-2 text-sm text-muted-foreground'>
				<p className='text-ink-light text-base'>Baris per hal</p>
				<Select
					onValueChange={(val) => setQuery({ limit: Number(val), page: 1 })}
					defaultValue={perPage.toString()}
				>
					<SelectTrigger className='w-[60px] h-8 border border-border'>
						<SelectValue />
					</SelectTrigger>
					<SelectContent>
						<SelectGroup>
							{['10', '20', '30'].map((val) => (
								<SelectItem key={val} value={val} className='text-ink-primary'>
									{val}
								</SelectItem>
							))}
						</SelectGroup>
					</SelectContent>
				</Select>
			</div>
		</div>
	)
}

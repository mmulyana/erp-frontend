import { ChevronLeft, ChevronRight } from 'lucide-react'
import { parseAsInteger, useQueryStates } from 'nuqs'
import { useRef } from 'react'

import { ScrollArea } from '@/shared/components/ui/scroll-area'
import { useIsMobile } from '@/shared/hooks/use-mobile'
import { Button } from '@/shared/components/ui/button'
import { cn } from '@/shared/utils/cn'
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/shared/components/ui/select'

type PaginationProps = {
	totalItems: number
	totalPages: number
}

export function Pagination({ totalItems, totalPages }: PaginationProps) {
	const isMobile = useIsMobile()

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
		<div className='w-full flex justify-center md:justify-between items-center mt-4'>
			{!isMobile && (
				<p className='text-ink-primary'>
					{from}-{to} <span className='text-ink-light'>dari</span> {totalItems}
				</p>
			)}

			<nav className='flex items-center gap-2'>
				{totalPages > 0 && (
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
						<ChevronLeft
							className='text-ink-secondary/80'
							size={18}
							strokeWidth={3.2}
						/>
					</button>
				)}
				<ul className='flex gap-1'>
					{getPageNumbers().map((number, index) => (
						<li key={index}>
							<button
								className={cn(
									'w-8 h-8 flex justify-center items-center border text-base rounded-md select-none',
									currentPage === number
										? 'border-brand text-white bg-brand'
										: number === '...'
										? 'border-border text-muted-foreground'
										: 'border-border hover:bg-white hover:border-[#D4D7DF]'
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
				{totalPages > 0 && (
					<button
						onClick={() => setQuery({ page: currentPage + 1 })}
						disabled={totalPages > 0 ? currentPage === totalPages : true}
						className={cn(
							'w-8 h-8 flex justify-center items-center border rounded-md border-[#D4D7DF] disabled:bg-transparent disabled:border-none',
							currentPage === totalPages
								? 'bg-transparent border-transparent text-[#747C94]/50'
								: 'bg-white text-[#747C94]'
						)}
					>
						<ChevronRight
							className='text-ink-secondary/80'
							size={18}
							strokeWidth={3.2}
						/>
					</button>
				)}
			</nav>

			{!isMobile && (
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
									<SelectItem
										key={val}
										value={val}
										className='text-ink-primary'
									>
										{val}
									</SelectItem>
								))}
							</SelectGroup>
						</SelectContent>
					</Select>
				</div>
			)}
		</div>
	)
}

type SimplePaginationProps = {
	totalPages: number
	children: React.ReactNode
}

export function SimplePagination({
	totalPages,
	children,
}: SimplePaginationProps) {
	const [query, setQuery] = useQueryStates({
		page: parseAsInteger.withDefault(1),
		limit: parseAsInteger.withDefault(10),
	})

	const currentPage = query.page || 1
	const scrollRef = useRef<HTMLDivElement>(null)

	const handlePageChange = (newPage: number) => {
		setQuery({ page: newPage })
		scrollRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
	}

	return (
		<ScrollArea className='h-[400px]'>
			<div ref={scrollRef} className='w-full flex flex-col gap-4'>
				{currentPage > 1 && (
					<div className='flex justify-center'>
						<Button
							variant='secondary'
							className='bg-gray-500/10 hover:bg-gray-500/20'
							onClick={() => handlePageChange(currentPage - 1)}
						>
							<ChevronLeft size={16} strokeWidth={3.2} />
							Sebelumnya
						</Button>
					</div>
				)}

				{children}

				{currentPage < totalPages && (
					<div className='flex justify-center'>
						<Button
							variant='secondary'
							className='bg-gray-500/10 hover:bg-gray-500/20'
							onClick={() => handlePageChange(currentPage + 1)}
						>
							Selanjutnya
							<ChevronRight size={16} strokeWidth={3.2} />
						</Button>
					</div>
				)}
			</div>
		</ScrollArea>
	)
}

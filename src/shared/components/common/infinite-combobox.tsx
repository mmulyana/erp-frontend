import { useEffect, useMemo, useRef, useState } from 'react'
import { Check, ChevronsUpDown } from 'lucide-react'
import { useDebounce } from '@uidotdev/usehooks'

import { Button } from '@/shared/components/ui/button'
import { cn } from '@/shared/utils/cn'
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from '@/shared/components/ui/command'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/shared/components/ui/popover'

type BaseItem = { id: string; name?: string }

interface props<T extends BaseItem> {
	defaultValue?: string
	onSelect?: (value: string) => void
	disabled?: boolean
	style?: { value?: string }

	placeholder?: string
	label?: (item: T) => string
	renderItem?: (item: T, isSelected: boolean) => React.ReactNode
	fetchItemById?: (id: string) => Promise<T | null>
	useInfiniteQuery: (params: { search: string }) => {
		data?: { pages: { data: T[] }[] }
		hasNextPage?: boolean
		isFetchingNextPage: boolean
		fetchNextPage: () => void
		isLoading: boolean
	}
}

export default function InfiniteCombobox<T extends BaseItem>({
	onSelect,
	disabled,
	style,
	defaultValue,
	placeholder = 'Pilih item',
	label = (item) => item.name || item.id,
	renderItem,
	fetchItemById,
	useInfiniteQuery,
}: props<T>) {
	const [open, setOpen] = useState(false)
	const [search, setSearch] = useState('')
	const [selectedItem, setSelectedItem] = useState<T | null>(null)
	const debouncedSearchTerm = useDebounce(search, 500)
	const loaderRef = useRef<HTMLDivElement>(null)
	const commandListRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		if (fetchItemById && defaultValue) {
			fetchItemById(defaultValue).then((item) => {
				if (item) setSelectedItem(item)
			})
		}
	}, [defaultValue, fetchItemById])

	const { data, hasNextPage, isFetchingNextPage, fetchNextPage, isLoading } =
		useInfiniteQuery({ search: debouncedSearchTerm })

	const items = useMemo(
		() => data?.pages.flatMap((page) => page?.data) ?? [],
		[data]
	)

	useEffect(() => {
		if (!open) return
		const commandList = commandListRef.current
		if (!commandList) return

		const handleScroll = () => {
			if (!loaderRef.current || !hasNextPage || isFetchingNextPage) return
			const rect = loaderRef.current.getBoundingClientRect()
			const listRect = commandList.getBoundingClientRect()
			if (rect.top <= listRect.bottom) fetchNextPage()
		}

		commandList.addEventListener('scroll', handleScroll)
		return () => commandList.removeEventListener('scroll', handleScroll)
	}, [open, hasNextPage, isFetchingNextPage, fetchNextPage])

	const handleSelect = (item: T) => {
		setSelectedItem(item)
		setOpen(false)
		onSelect?.(item.id)
	}

	// Note: force re-render to attach ref at first open popover
	useEffect(() => {
		if (!open) return

		const timeout = setTimeout(() => {
			const handleScroll = () => {
				if (
					!commandListRef.current ||
					!loaderRef.current ||
					!hasNextPage ||
					isFetchingNextPage
				) {
					return
				}

				const commandList = commandListRef.current
				const loader = loaderRef.current

				const rect = loader.getBoundingClientRect()
				const listRect = commandList.getBoundingClientRect()

				if (rect.top <= listRect.bottom) {
					fetchNextPage()
				}
			}

			const commandList = commandListRef.current
			if (commandList) {
				commandList.addEventListener('scroll', handleScroll)
			}

			return () => {
				if (commandList) {
					commandList.removeEventListener('scroll', handleScroll)
				}
			}
		}, 100)

		return () => clearTimeout(timeout)
	}, [open, fetchNextPage, hasNextPage, isFetchingNextPage])

	return (
		<Popover open={open} onOpenChange={setOpen} modal>
			<PopoverTrigger disabled={disabled} asChild>
				<Button
					variant='outline'
					role='combobox'
					aria-expanded={open}
					className={cn('w-full justify-between h-10 bg-surface', style?.value)}
				>
					{selectedItem ? label(selectedItem) : placeholder}
					<ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
				</Button>
			</PopoverTrigger>
			<PopoverContent
				className='p-0'
				align='start'
				style={{ width: 'var(--radix-popover-trigger-width)' }}
			>
				<Command shouldFilter={false}>
					<CommandInput
						placeholder='Cari...'
						value={search}
						onValueChange={setSearch}
					/>
					<CommandList ref={commandListRef} className='max-h-60 overflow-auto'>
						<CommandEmpty>
							{isLoading ? 'Memuat...' : 'Tidak ditemukan'}
						</CommandEmpty>
						<CommandGroup>
							{items.map((item) => (
								<CommandItem
									key={item.id}
									value={item.id}
									onSelect={() => handleSelect(item)}
								>
									{renderItem ? (
										renderItem(item, selectedItem?.id === item.id)
									) : (
										<>
											{label(item)}
											{selectedItem?.id === item.id && (
												<Check className='ml-auto h-4 w-4' />
											)}
										</>
									)}
								</CommandItem>
							))}
							{(hasNextPage || isFetchingNextPage) && (
								<div
									ref={loaderRef}
									className='h-10 py-2 text-center text-sm text-gray-500'
								>
									{isFetchingNextPage ? 'Memuat lebih banyak...' : ' '}
								</div>
							)}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	)
}

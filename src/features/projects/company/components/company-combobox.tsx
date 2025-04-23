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

import { useCompanyInfinite } from '../api/use-company-infinite'
import { useCompany } from '../api/use-company'
import { Company } from '../types'

type Props = {
	onSelect?: (value: string) => void
	disabled?: boolean
	style?: {
		value?: string
	}
	defaultValue?: string
}

export default function CompanyCombobox({
	onSelect,
	disabled,
	style,
	defaultValue,
}: Props) {
	const [open, setOpen] = useState(false)
	const [search, setSearch] = useState('')
	const [selectedCompany, setSelectedCompany] = useState<Company | null>(null)
	const debouncedSearchTerm = useDebounce(search, 500)
	const loaderRef = useRef<HTMLDivElement>(null)
	const commandListRef = useRef<HTMLDivElement>(null)

	const { data: company } = useCompany({ id: defaultValue })

	useEffect(() => {
		if (company?.data && defaultValue) {
			setSelectedCompany(company.data)
		}
	}, [company, defaultValue])

	const { data, hasNextPage, isFetchingNextPage, fetchNextPage, isLoading } =
		useCompanyInfinite({
			search: debouncedSearchTerm,
			limit: 10,
		})

	useEffect(() => {
		const commandList = commandListRef.current
		if (!commandList) return

		const handleScroll = () => {
			if (
				!commandListRef.current ||
				!loaderRef.current ||
				!hasNextPage ||
				isFetchingNextPage
			)
				return

			const loader = loaderRef.current
			const rect = loader.getBoundingClientRect()
			const listRect = commandList.getBoundingClientRect()

			if (rect.top <= listRect.bottom) {
				fetchNextPage()
			}
		}

		commandList.addEventListener('scroll', handleScroll)
		return () => {
			commandList.removeEventListener('scroll', handleScroll)
		}
	}, [fetchNextPage, hasNextPage, isFetchingNextPage])

	const handleSelect = (company: Company) => {
		setSelectedCompany(company)
		setOpen(false)
		onSelect?.(company.id)
	}

	const companies = useMemo(
		() => data?.pages.flatMap((page) => page?.data) ?? [],
		[data]
	)

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
					className={cn('w-full justify-between h-10', style?.value)}
				>
					{selectedCompany ? selectedCompany.name : 'Pilih perusahaan'}
					<ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
				</Button>
			</PopoverTrigger>
			<PopoverContent
				className=' p-0'
				align='start'
				style={{ width: 'var(--radix-popover-trigger-width)' }}
			>
				<Command shouldFilter={false}>
					<CommandInput
						placeholder='Cari perusahaan...'
						value={search}
						onValueChange={setSearch}
					/>
					<CommandList ref={commandListRef} className='max-h-60 overflow-auto'>
						<CommandEmpty>
							{isLoading ? 'Memuat...' : 'Perusahaan tidak ditemukan'}
						</CommandEmpty>
						<CommandGroup>
							{companies.map((item) => (
								<CommandItem
									key={item.id}
									value={item.id}
									onSelect={() => handleSelect(item)}
								>
									{item.name}
									{selectedCompany?.id === item?.id && (
										<Check className='ml-auto h-4 w-4' />
									)}
								</CommandItem>
							))}

							{(hasNextPage || isFetchingNextPage) && (
								<div
									ref={loaderRef}
									className='h-10 py-2 text-center text-sm text-gray-500'
								>
									{isFetchingNextPage || data?.pageParams.length === 1
										? 'Memuat lebih banyak...'
										: ' '}
								</div>
							)}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	)
}

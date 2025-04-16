import { useEffect, useMemo, useRef, useState } from 'react'
import { Check, ChevronsUpDown } from 'lucide-react'

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
import { Button } from '@/shared/components/ui/button'
import { useDebounce } from '@uidotdev/usehooks'
import { useInfiniteEmployees } from '../api/use-infinite-employees'
import { Employee } from '@/shared/types'
import { cn } from '@/shared/utils/cn'

type Props = {
	onSelect?: (value: string) => void
	disabled?: boolean
	style?: {
		value?: string
	}
}

export default function EmployeeCombobox({ onSelect, disabled, style }: Props) {
	const [open, setOpen] = useState(false)
	const [search, setSearch] = useState('')
	const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
		null
	)
	const debouncedSearchTerm = useDebounce(search, 500)
	const loaderRef = useRef<HTMLDivElement>(null)
	const commandListRef = useRef<HTMLDivElement>(null)

	const { data, hasNextPage, isFetchingNextPage, fetchNextPage, isLoading } =
		useInfiniteEmployees({
			search: debouncedSearchTerm,
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

	const handleSelect = (employee: Employee) => {
		setSelectedEmployee(employee)
		setOpen(false)
		onSelect?.(employee.id)
	}

	const employees = useMemo(
		() => data?.pages.flatMap((page) => page.data) ?? [],
		[data]
	)

	const [, setRenderTick] = useState(0)

	useEffect(() => {
		if (open) {
			const timeout = setTimeout(() => {
				setRenderTick((tick) => tick + 1)
			}, 100)

			return () => clearTimeout(timeout)
		}
	}, [open])

	return (
		<Popover open={open} onOpenChange={setOpen} modal>
			<PopoverTrigger disabled={disabled} asChild>
				<Button
					variant='outline'
					role='combobox'
					aria-expanded={open}
					className={cn('w-full justify-between h-10', style?.value)}
				>
					{selectedEmployee ? selectedEmployee.fullname : 'Pilih pegawai'}
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
						placeholder='Cari pegawai...'
						value={search}
						onValueChange={setSearch}
					/>
					<CommandList ref={commandListRef} className='max-h-60 overflow-auto'>
						<CommandEmpty>
							{isLoading ? 'Memuat...' : 'Pegawai tidak ditemukan'}
						</CommandEmpty>
						<CommandGroup>
							{employees.map((employee) => (
								<CommandItem
									key={employee.id}
									value={employee.id}
									onSelect={() => handleSelect(employee)}
								>
									{employee.fullname}
									{selectedEmployee?.id === employee.id && (
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

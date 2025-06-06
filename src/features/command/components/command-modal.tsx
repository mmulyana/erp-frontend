import React, { useState, useEffect, useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
	Search,
	FileText,
	Users,
	ArrowRight,
	Users2,
	Building,
	Store,
	Hammer,
	Warehouse,
	HardHat,
	X,
} from 'lucide-react'
import LoadingState from '@/shared/components/common/loading-state'
import { Dialog, DialogContent } from '@/shared/components/ui/dialog'
import { Button } from '@/shared/components/ui/button'
import { Input } from '@/shared/components/ui/input'
import { baseUrl } from '@/shared/constants/urls'
import { paths } from '@/shared/constants/paths'
import { debounce } from '@/shared/utils'
import { cn } from '@/shared/utils/cn'

import CommandSelector from './command-selector'
import { useCommand } from '../api/use-command'

interface SearchResult {
	id: string
	title: string
	description?: string
	category:
		| 'employee'
		| 'payrollPeriod'
		| 'project'
		| 'client'
		| 'companyClient'
		| 'inventory'
		| 'supplier'
		| 'warehouse'
		| 'projectAttachment'
	url?: string
}

interface Props {
	open: boolean
	onOpenChange: (open: boolean) => void
}

const categoryIcons = {
	employee: Users2,
	payrollPeriod: FileText,
	project: HardHat,
	client: Users,
	companyClient: Building,
	inventory: Hammer,
	supplier: Store,
	warehouse: Warehouse,
	projectAttachment: FileText,
}

const categoryUrl = {
	employee: paths.hrisMasterdataEmployee,
	payrollPeriod: paths.hrisPayroll,
	project: paths.projectMasterdataProjects,
	client: paths.projectMasterdataClient,
	companyClient: paths.projectMasterdataClientCompany,
	inventory: paths.inventoryMasterdataItem,
	supplier: paths.inventoryMasterdataSupplier,
	warehouse: paths.inventoryMasterdataLocation,
	projectAttachment: baseUrl,
}

const categoryTitle = {
	employee: 'Pegawai',
	payrollPeriod: 'Periode gaji',
	project: 'Proyek',
	client: 'Klien',
	companyClient: 'Perusahaan klien',
	inventory: 'Barang',
	supplier: 'Supplier ',
	warehouse: 'Gudang',
	projectAttachment: 'Lampiran',
}

const categoryColors = {
	employee: 'bg-green-200/80 text-green-800',
	payrollPeriod: 'bg-indigo-200/80 text-indigo-800',
	project: 'bg-cyan-200/80 text-cyan-800',
	client: 'bg-yellow-200/80 text-yellow-800',
	companyClient: 'bg-yellow-200/80 text-yellow-800',
	inventory: 'bg-teal-200/80 text-teal-800',
	supplier: 'bg-orange-200/80 text-orange-800',
	warehouse: 'bg-gray-200/80 text-gray-800',
	projectAttachment: 'bg-purple-200/80 text-purple-800',
}

export default function CommandModal({ open, onOpenChange }: Props) {
	const navigate = useNavigate()
	const [query, setQuery] = useState('')
	const [debouncedQuery, setDebouncedQuery] = useState('')
	const [results, setResults] = useState<SearchResult[]>([])
	const [selectedIndex, setSelectedIndex] = useState(0)
	const [types, setTypes] = useState([])

	const handleDebounce = useMemo(() => {
		return debounce((val: string) => {
			setDebouncedQuery(val)
		}, 300)
	}, [])

	const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const val = e.target.value
		setQuery(val)
		handleDebounce(val)
	}

	const { data, isPending } = useCommand({
		q: debouncedQuery,
		types,
	})

	useEffect(() => {
		if (!data?.data) {
			setResults([])
			return
		}

		const mapped: SearchResult[] = Object.entries(data?.data).flatMap(
			([category, items]) =>
				items.map((item) => ({
					id: item.id,
					title: item.label,
					description: item.extra,
					category: category as SearchResult['category'],
				}))
		)

		setResults(mapped)
		setSelectedIndex(0)
	}, [data, open])

	useEffect(() => {
		if (!open) {
			setQuery('')
			setDebouncedQuery('')
			setResults([])
			setSelectedIndex(0)
		}
	}, [open])

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === 'ArrowDown') {
			e.preventDefault()
			setSelectedIndex((prev) => (prev < results.length - 1 ? prev + 1 : prev))
		} else if (e.key === 'ArrowUp') {
			e.preventDefault()
			setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev))
		} else if (e.key === 'Enter' && results[selectedIndex]) {
			e.preventDefault()
			handleResultClick(results[selectedIndex])
		}
	}

	const handleResultClick = (result: SearchResult) => {
		const url = `${categoryUrl[result.category]}/${result.id}`
		navigate(url)
	}

	const groupedResults = results.reduce((acc, result) => {
		if (!acc[result.category]) {
			acc[result.category] = []
		}
		acc[result.category].push(result)
		return acc
	}, {} as Record<string, SearchResult[]>)

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className='max-w-2xl p-0 gap-0 min-h-40' showClose={false}>
				<div className='flex items-center border-b px-4 py-3 gap-4 relative'>
					<Search className='absolute left-6' size={20} />
					<Input
						placeholder='Cari semua data'
						value={query}
						onChange={handleQueryChange}
						onKeyDown={handleKeyDown}
						className='border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-base pl-9'
						autoFocus
					/>
					<Button variant='ghost' onClick={() => onOpenChange(false)}>
						<X />
					</Button>
				</div>

				<CommandSelector selectedChips={types} setSelectedChips={setTypes} />

				<div className='max-h-96 overflow-y-auto'>
					{debouncedQuery && results.length === 0 && !isPending && (
						<div className='p-8 text-center text-muted-foreground'>
							<Search className='h-8 w-8 mx-auto mb-2 opacity-50' />
							<p>Tidak ada hasil yang ditemukan untuk "{debouncedQuery}"</p>
						</div>
					)}

					{!isPending ? (
						Object.entries(groupedResults).map(
							([category, categoryResults]) => {
								const Icon =
									categoryIcons[category as keyof typeof categoryIcons]
								const text =
									categoryTitle[category as keyof typeof categoryTitle]
								return (
									<div key={category} className='p-2'>
										<div className='flex items-center gap-2 px-2 py-2.5 border-b text-xs font-medium text-muted-foreground uppercase tracking-wide'>
											<Icon size={18} />
											{text}
										</div>
										{categoryResults.map((result) => {
											const globalIndex = results.indexOf(result)
											const isSelected = globalIndex === selectedIndex
											return (
												<Link
													to={`${categoryUrl[category]}/${result.id}`}
													key={result.id}
													className={cn(
														'flex items-center justify-between p-2 mx-1 rounded cursor-pointer transition-colors',
														isSelected ? 'bg-accent' : 'hover:bg-accent/50'
													)}
													target={
														category === 'projectAttachment'
															? '_blank'
															: '_parent'
													}
												>
													<div className='flex items-center gap-3 flex-1 min-w-0'>
														<div
															className={cn(
																categoryColors[result.category],
																'p-1.5 rounded'
															)}
														>
															<Icon className='h-4 w-4' />
														</div>
														<div className='flex-1 min-w-0'>
															<p className='font-medium text-sm truncate'>
																{result.title}
															</p>
															{result.description && (
																<p className='text-xs text-muted-foreground truncate'>
																	{result.description}
																</p>
															)}
														</div>
													</div>
													<ArrowRight className='h-3 w-3 text-muted-foreground' />
												</Link>
											)
										})}
									</div>
								)
							}
						)
					) : (
						<LoadingState className='relative h-40' />
					)}
				</div>

				{results.length > 0 && (
					<div className='border-t px-4 py-2 text-xs text-muted-foreground'>
						Use ↑↓ to navigate, Enter to select, Esc to close
					</div>
				)}
			</DialogContent>
		</Dialog>
	)
}

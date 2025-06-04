import type React from 'react'

import { useState, useEffect, useCallback } from 'react'
import {
	Search,
	FileText,
	User,
	Settings,
	Hash,
	ArrowRight,
} from 'lucide-react'
import { Dialog, DialogContent } from '@/shared/components/ui/dialog'
import { Input } from '@/shared/components/ui/input'
import { Badge } from '@/shared/components/ui/badge'

interface SearchResult {
	id: string
	title: string
	description?: string
	category: 'pages' | 'users' | 'documents' | 'settings' | 'tags'
	url?: string
}

interface SearchModalProps {
	open: boolean
	onOpenChange: (open: boolean) => void
}

const mockData: SearchResult[] = [
	{
		id: '1',
		title: 'Dashboard',
		description: 'Main dashboard overview',
		category: 'pages',
		url: '/dashboard',
	},
	{
		id: '2',
		title: 'User Profile',
		description: 'Manage your profile settings',
		category: 'pages',
		url: '/profile',
	},
	{
		id: '3',
		title: 'Analytics',
		description: 'View detailed analytics',
		category: 'pages',
		url: '/analytics',
	},
	{
		id: '4',
		title: 'John Doe',
		description: 'Software Engineer',
		category: 'users',
	},
	{
		id: '5',
		title: 'Jane Smith',
		description: 'Product Manager',
		category: 'users',
	},
	{
		id: '6',
		title: 'Project Proposal',
		description: 'Q4 2024 roadmap document',
		category: 'documents',
	},
	{
		id: '7',
		title: 'Meeting Notes',
		description: 'Weekly team sync notes',
		category: 'documents',
	},
	{
		id: '8',
		title: 'Account Settings',
		description: 'Manage account preferences',
		category: 'settings',
		url: '/settings',
	},
	{
		id: '9',
		title: 'Billing',
		description: 'View billing and subscription',
		category: 'settings',
		url: '/billing',
	},
	{
		id: '10',
		title: '#frontend',
		description: 'Frontend development tag',
		category: 'tags',
	},
	{
		id: '11',
		title: '#design',
		description: 'Design related content',
		category: 'tags',
	},
]

const categoryIcons = {
	pages: FileText,
	users: User,
	documents: FileText,
	settings: Settings,
	tags: Hash,
}

const categoryColors = {
	pages: 'bg-blue-100 text-blue-800',
	users: 'bg-green-100 text-green-800',
	documents: 'bg-purple-100 text-purple-800',
	settings: 'bg-orange-100 text-orange-800',
	tags: 'bg-pink-100 text-pink-800',
}

export default function SpotlightModal({
	open,
	onOpenChange,
}: SearchModalProps) {
	const [query, setQuery] = useState('')
	const [results, setResults] = useState<SearchResult[]>([])
	const [selectedIndex, setSelectedIndex] = useState(0)

	const searchResults = useCallback((searchQuery: string) => {
		if (!searchQuery.trim()) {
			setResults([])
			return
		}

		const filtered = mockData.filter(
			(item) =>
				item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
				item.description?.toLowerCase().includes(searchQuery.toLowerCase())
		)

		setResults(filtered)
		setSelectedIndex(0)
	}, [])

	useEffect(() => {
		searchResults(query)
	}, [query, searchResults])

	useEffect(() => {
		if (!open) {
			setQuery('')
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
		console.log('Navigate to:', result.url || result.title)
		onOpenChange(false)
		// In a real app, you would navigate to the result URL
		// router.push(result.url || '/')
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
			<DialogContent className='max-w-2xl p-0 gap-0' showClose={false}>
				<div className='flex items-center border-b px-4 py-3'>
					<Search className='h-4 w-4 text-muted-foreground mr-3' />
					<Input
						placeholder='Search everything...'
						value={query}
						onChange={(e) => setQuery(e.target.value)}
						onKeyDown={handleKeyDown}
						className='border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-base'
						autoFocus
					/>
				</div>

				<div className='max-h-96 overflow-y-auto'>
					{query && results.length === 0 && (
						<div className='p-8 text-center text-muted-foreground'>
							<Search className='h-8 w-8 mx-auto mb-2 opacity-50' />
							<p>No results found for "{query}"</p>
						</div>
					)}

					{!query && (
						<div className='p-4 text-sm text-muted-foreground'>
							<p className='mb-2'>Try searching for:</p>
							<div className='flex flex-wrap gap-2'>
								<Badge
									variant='secondary'
									className='cursor-pointer'
									onClick={() => setQuery('dashboard')}
								>
									Dashboard
								</Badge>
								<Badge
									variant='secondary'
									className='cursor-pointer'
									onClick={() => setQuery('users')}
								>
									Users
								</Badge>
								<Badge
									variant='secondary'
									className='cursor-pointer'
									onClick={() => setQuery('settings')}
								>
									Settings
								</Badge>
							</div>
						</div>
					)}

					{Object.entries(groupedResults).map(([category, categoryResults]) => {
						const Icon = categoryIcons[category as keyof typeof categoryIcons]
						return (
							<div key={category} className='p-2'>
								<div className='flex items-center gap-2 px-2 py-1 text-xs font-medium text-muted-foreground uppercase tracking-wide'>
									<Icon className='h-3 w-3' />
									{category}
								</div>
								{categoryResults.map((result) => {
									const globalIndex = results.indexOf(result)
									const isSelected = globalIndex === selectedIndex
									return (
										<div
											key={result.id}
											className={`flex items-center justify-between p-2 mx-1 rounded cursor-pointer transition-colors ${
												isSelected ? 'bg-accent' : 'hover:bg-accent/50'
											}`}
											onClick={() => handleResultClick(result)}
										>
											<div className='flex items-center gap-3 flex-1 min-w-0'>
												<div
													className={`p-1.5 rounded ${
														categoryColors[result.category]
													}`}
												>
													<Icon className='h-3 w-3' />
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
										</div>
									)
								})}
							</div>
						)
					})}
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

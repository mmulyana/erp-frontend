import { useEffect, useMemo, useState } from 'react'
import { parseAsString, useQueryState } from 'nuqs'
import { Search } from 'lucide-react'

import { debounce } from '@/shared/utils'
import { cn } from '@/shared/utils/cn'

type Props = {
	placeholder?: string
	className?: string
}

export default function SearchV3({ placeholder, className }: Props) {
	const [query, setQuery] = useQueryState('q', parseAsString.withDefault(''))
	const [inputValue, setInputValue] = useState(query)

	useEffect(() => {
		setInputValue(query)
	}, [query])

	const debouncedSetQuery = useMemo(
		() => debounce((value: string) => setQuery(value || null), 300),
		[setQuery]
	)

	return (
		<div className='relative h-fit w-fit'>
			<Search
				size={14}
				className='top-1/2 -translate-y-1/2 left-3 absolute text-ink-secondary/80'
			/>
			<input
				type='text'
				value={inputValue}
				onChange={(e) => {
					setInputValue(e.target.value)
					debouncedSetQuery(e.target.value)
				}}
				placeholder={placeholder || 'Cari data'}
				className={cn(
					'h-8 pr-2 pb-0.5 pl-9 max-w-[180px] w-full border border-border rounded-lg placeholder:text-ink-light valid:text-ink-primary',
					className
				)}
			/>
		</div>
	)
}

import { parseAsString, useQueryState } from 'nuqs'
import { useMemo } from 'react'

import { debounce } from '@/shared/utils'
import { Search } from 'lucide-react'

type Props = {
	placeholder?: string
}

export default function SearchV3({ placeholder }: Props) {
	const [query, setQuery] = useQueryState('q', parseAsString.withDefault(''))

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
				defaultValue={query}
				onChange={(e) => debouncedSetQuery(e.target.value)}
				placeholder={placeholder || 'Cari data'}
				className='h-8 pr-2 pb-0.5 pl-9 max-w-[180px] w-full border border-border rounded-lg placeholder:text-ink-light valid:text-ink-primary'
			/>
		</div>
	)
}

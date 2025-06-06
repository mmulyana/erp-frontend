import { useEffect, useMemo, useState } from 'react'
import { parseAsString, useQueryState } from 'nuqs'
import { Search } from 'lucide-react'

import { debounce } from '@/shared/utils'
import { cn } from '@/shared/utils/cn'

type Props = {
	placeholder?: string
	className?: string
	value?: string
	onValueChange?: (value: string) => void
}

export default function SearchV3({
	placeholder,
	className,
	value,
	onValueChange,
}: Props) {
	const isControlled = typeof onValueChange === 'function' && typeof value === 'string'

	const [query, setQuery] = useQueryState('q', parseAsString.withDefault(''))
	const [inputValue, setInputValue] = useState(value ?? query)

	useEffect(() => {
		if (isControlled) {
			setInputValue(value!)
		} else {
			setInputValue(query)
		}
	}, [value, query, isControlled])

	const debouncedSet = useMemo(
		() =>
			debounce((val: string) => {
				if (isControlled) {
					onValueChange!(val)
				} else {
					setQuery(val || null)
				}
			}, 300),
		[isControlled, setQuery, onValueChange]
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
					debouncedSet(e.target.value)
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

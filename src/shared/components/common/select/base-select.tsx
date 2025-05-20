import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/shared/components/ui/select'
import { selectOption } from '@/shared/types'
import { parseAsString, useQueryState, useQueryStates } from 'nuqs'

type props = {
	label: string
	options?: selectOption[]
	urlName?: string
	defaultValue?: string
}
export default function BaseSelect({
	options,
	label,
	urlName = 'name',
	defaultValue = '-',
}: props) {
	const [query, setQuery] = useQueryStates({
		[urlName]: parseAsString.withDefault('-'),
	})

	const handleChange = (value: string) => {
		setQuery((prev) => ({ ...prev, [urlName]: value }))
	}

	const fullOptions: selectOption[] = [
		{ label: 'Pilih', value: '-' },
		...(options || [])?.filter((o) => o.value !== '-'),
	]

	return (
		<div className='space-y-2'>
			<p className='text-ink-primary font-medium text-sm'>{label}</p>
			<Select
				value={query[urlName] ?? defaultValue}
				onValueChange={handleChange}
			>
				<SelectTrigger className='w-[260px]'>
					<SelectValue placeholder='Urutkan' />
				</SelectTrigger>
				<SelectContent>
					{fullOptions?.map((option) => (
						<SelectItem
							key={option.value}
							value={option.value}
						>
							{option.label}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
		</div>
	)
}

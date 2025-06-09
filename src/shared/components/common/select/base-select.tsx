import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/shared/components/ui/select'
import { selectOption } from '@/shared/types'
import { cn } from '@/shared/utils/cn'
import { parseAsString, useQueryStates } from 'nuqs'

type props = {
	label?: string
	options?: selectOption[]
	urlName?: string
	defaultValue?: string
	style?: {
		trigger?: string
	}
}
export default function BaseSelect({
	options,
	label,
	urlName = 'name',
	defaultValue = '-',
	style,
}: props) {
	const [query, setQuery] = useQueryStates({
		[urlName]: parseAsString.withDefault(defaultValue),
	})

	const handleChange = (value: string) => {
		setQuery((prev) => ({ ...prev, [urlName]: value }))
	}

	return (
		<div className='space-y-2'>
			{label && <p className='text-ink-primary font-medium text-sm'>{label}</p>}
			<Select
				value={query[urlName] ?? defaultValue}
				onValueChange={handleChange}
			>
				<SelectTrigger className={cn('w-full', style?.trigger)}>
					<SelectValue placeholder='Urutkan' />
				</SelectTrigger>
				<SelectContent>
					<SelectGroup>
						{options?.map((option) => (
							<SelectItem key={option.value} value={option.value}>
								{option.label}
							</SelectItem>
						))}
					</SelectGroup>
				</SelectContent>
			</Select>
		</div>
	)
}

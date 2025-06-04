import FilterButton from '@/shared/components/common/filter-button'
import BaseSelect from '@/shared/components/common/select/base-select'
import { Input } from '@/shared/components/ui/input'
import { selectOption } from '@/shared/types'
import { debounce } from '@/shared/utils'
import { parseAsString, useQueryStates } from 'nuqs'
import { useMemo, useState } from 'react'

export const activeOption: selectOption[] = [
	{
		label: 'Aktif',
		value: 'true',
	},
	{
		label: 'Nonaktif',
		value: 'false',
	},
]

export const educationOption: selectOption[] = [
	{
		label: 'SD',
		value: 'sd',
	},
	{
		label: 'SMP',
		value: 'smp',
	},
	{
		label: 'SMA',
		value: 'sma',
	},
	{
		label: 'S1',
		value: 's1',
	},
	{
		label: 'S2',
		value: 's2',
	},
	{
		label: 'S3',
		value: 's3',
	},
]

type props = {
	className?: string
	hideFilter?: string[]
	children?: React.ReactNode
}
export default function FilterEmployee({
	className = 'ml-0 md:ml-auto',
	hideFilter = [],
	children,
}: props) {
	const [query, setQuery] = useQueryStates({
		active: parseAsString.withDefault(''),
		lastEdu: parseAsString.withDefault(''),
		position: parseAsString.withDefault(''),
	})

	const [positionInput, setPositionInput] = useState(query.position)

	const debouncedSetQuery = useMemo(
		() =>
			debounce((val: string) => {
				setQuery({ position: val })
			}, 500),
		[setQuery]
	)

	const handlePositionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const val = e.target.value
		setPositionInput(val)
		debouncedSetQuery(val)
	}

	const filters = [
		{
			name: 'active',
			component: (
				<BaseSelect
					label='Status'
					options={activeOption}
					urlName='active'
					defaultValue={query.active}
				/>
			),
		},
		{
			name: 'lastEdu',
			component: (
				<BaseSelect
					label='Pend. Terakhir'
					options={educationOption}
					urlName='lastEdu'
					defaultValue={query.lastEdu}
				/>
			),
		},
		{
			name: 'position',
			component: (
				<div className='space-y-2'>
					<p className='text-sm text-ink-primary font-medium'>Jabatan</p>
					<Input
						className='h-10 bg-white'
						value={positionInput}
						onChange={handlePositionChange}
					/>
				</div>
			),
		},
	]

	return (
		<FilterButton
			style={{
				trigger: className,
				content: 'space-y-2',
			}}
		>
			{filters
				.filter((i) => !hideFilter.includes(i.name))
				.map((i) => i.component)}
			{children}
		</FilterButton>
	)
}

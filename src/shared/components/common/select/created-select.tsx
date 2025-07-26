import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/shared/components/ui/select'
import { selectOption } from '@/shared/types'
import { useQueryState } from 'nuqs'

const baseOption = [
	{ label: 'Tanggal Dibuat (Terbaru)', value: 'createdAt:desc' },
	{ label: 'Tanggal Dibuat (Terlama)', value: 'createdAt:asc' },
]

type props = {
	options?: selectOption[]
}
export default function CreatedSelect({ options }: props) {
	const [sortParam, setSortParam] = useQueryState('sort', {
		history: 'replace',
		shallow: false,
	})

	const handleChange = (value: string) => {
		setSortParam(value)
	}

	return (
		<div className='space-y-2'>
			<p className='text-ink-primary font-medium text-sm'>Urut berdasarkan</p>
			<Select value={sortParam ?? ""} onValueChange={handleChange}>
				<SelectTrigger className='w-full'>
					<SelectValue placeholder='Urutkan' />
				</SelectTrigger>
				<SelectContent>
					{[...baseOption, ...(options || [])].map((option) => (
						<SelectItem key={option.value} value={option.value}>
							{option.label}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
		</div>
	)
}

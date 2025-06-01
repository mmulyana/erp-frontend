import { Check } from 'lucide-react'

import InfiniteCombobox from '@/shared/components/common/infinite-combobox'
import { urls } from '@/shared/constants/urls'
import http from '@/shared/utils/http'

import { useProjectInfinite } from '../api/use-projects-infinite'

export default function ProjectCombobox(props: {
	onSelect?: (val: string) => void
	defaultValue?: string
	disabled?: boolean
	className?: string
}) {
	return (
		<InfiniteCombobox
			{...props}
			useInfiniteQuery={({ search }) =>
				useProjectInfinite({ search, limit: 10 })
			}
			style={{ value: props.className }}
			fetchItemById={fetchItemById}
			label={(item) => item.name}
			placeholder='Pilih proyek'
			renderItem={(item, isSelected) => (
				<div className='flex gap-2 justify-between w-full items-center'>
					<p>{item.name}</p>
					{isSelected && <Check className='h-4 w-4' />}
				</div>
			)}
		/>
	)
}

const fetchItemById = async (id: string) => {
	const { data } = await http(`${urls.project}/${id}`)
	return data.data ?? null
}

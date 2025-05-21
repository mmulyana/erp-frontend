import { Check } from 'lucide-react'

import InfiniteCombobox from '@/shared/components/common/infinite-combobox'

import { useClientInfinite } from '../api/use-client-infinite'
import { useClient } from '../api/use-client'
import http from '@/shared/utils/http'
import { urls } from '@/shared/constants/urls'

export default function ClientCombobox(props: {
	onSelect?: (val: string) => void
	defaultValue?: string
}) {
	return (
		<InfiniteCombobox
			{...props}
			useInfiniteQuery={({ search }) =>
				useClientInfinite({ search, limit: 10 })
			}
			fetchItemById={fetchItemById}
			label={(item) => item.name}
			placeholder='Pilih'
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
	const { data } = await http(`${urls.client}/${id}`)
	return data.data ?? null
}

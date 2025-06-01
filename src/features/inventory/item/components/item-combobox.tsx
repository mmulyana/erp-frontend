import { Check } from 'lucide-react'

import InfiniteCombobox from '@/shared/components/common/infinite-combobox'
import { baseUrl, urls } from '@/shared/constants/urls'
import http from '@/shared/utils/http'

import { useItemInfinite } from '../api/use-items-infinite'
import PhotoUrl from '@/shared/components/common/photo-url'

export default function ItemCombobox(props: {
	onSelect?: (val: string) => void
	defaultValue?: string
	className?: string
}) {
	return (
		<InfiniteCombobox
			{...props}
			useInfiniteQuery={({ search }) =>
				useItemInfinite({ search, limit: '10' })
			}
			style={{ value: props.className }}
			fetchItemById={fetchItemById}
			label={(item) => item.name}
			placeholder='Pilih barang'
			renderItem={(item, isSelected) => (
				<div className='flex gap-2 justify-between w-full items-center'>
					<div className='flex gap-2 items-center'>
						<PhotoUrl
							url={item.url || ''}
							style={{ img: 'h-10 w-10 rounded-md' }}
						/>
						<p>{item.name}</p>
					</div>
					{isSelected && <Check className='h-4 w-4' />}
				</div>
			)}
		/>
	)
}

const fetchItemById = async (id: string) => {
	const { data } = await http(`${urls.item}/${id}`)
	return data?.data ?? null
}

import { Check } from 'lucide-react'

import { baseUrl, urls } from '@/shared/constants/urls'
import InfiniteCombobox from '@/shared/components/common/infinite-combobox'
import http from '@/shared/utils/http'

import { useBrandInfinite } from '../api/use-brands-infinite'

export default function BrandCombobox(props: {
	onSelect?: (val: string) => void
	defaultValue?: string
}) {
	return (
		<InfiniteCombobox
			{...props}
			useInfiniteQuery={({ search }) =>
				useBrandInfinite({ search, limit: '10' })
			}
			fetchItemById={fetchItemById}
			label={(item) => item.name}
			placeholder='Pilih merek'
			renderItem={(item, isSelected) => (
				<div className='flex gap-2 justify-between w-full items-center'>
					<div className='flex gap-2 items-center'>
						{item.photoUrl && (
							<img
								className='h-10 w-10 rounded'
								src={`${baseUrl}/${item.photoUrl}`}
							/>
						)}
						<p>{item.name}</p>
					</div>
					{isSelected && <Check className='h-4 w-4' />}
				</div>
			)}
		/>
	)
}

const fetchItemById = async (id: string) => {
	const { data } = await http(`${urls.brand}/${id}`)
	return data.data ?? null
}

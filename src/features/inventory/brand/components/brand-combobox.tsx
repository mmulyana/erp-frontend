import InfiniteCombobox from '@/shared/components/common/infinite-combobox'
import { baseUrl } from '@/shared/constants/urls'

import { useBrandInfinite } from '../api/use-brands-infinite'
import { useBrand } from '../api/use-brand'
import { Check } from 'lucide-react'

export default function BrandCombobox(props: {
	onSelect?: (val: string) => void
	defaultValue?: string
}) {
	return (
		<InfiniteCombobox
			{...props}
			useInfiniteQuery={({ search }) => useBrandInfinite({ search, limit: 10 })}
			fetchItemById={async (id) => {
				const { data } = await useBrand({ id })
				return data?.data ?? null
			}}
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

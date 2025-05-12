import { Check } from 'lucide-react'

import InfiniteCombobox from '@/shared/components/common/infinite-combobox'
import { useSupplierInfinite } from '../api/use-suppliers-infinite'
import { useSupplier } from '../api/use-supplier'
import { urls } from '@/shared/constants/urls'
import http from '@/shared/utils/http'

export default function SupplierCombobox(props: {
	onSelect?: (val: string) => void
	defaultValue?: string
}) {
	return (
		<InfiniteCombobox
			{...props}
			useInfiniteQuery={({ search }) =>
				useSupplierInfinite({ search, limit: '10' })
			}
			fetchItemById={async (id) => {
				const { data } = await http(`${urls.supplier}/${id}`)
				return data?.data ?? null
			}}
			label={(item) => item.name || ''}
			placeholder='Pilih Supplier'
			renderItem={(item, isSelected) => (
				<div className='flex gap-2 justify-between w-full items-center'>
					<div className='flex gap-2 items-center'>
						<p>{item.name}</p>
					</div>
					{isSelected && <Check className='h-4 w-4' />}
				</div>
			)}
		/>
	)
}

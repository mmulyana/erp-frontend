import InfiniteCombobox from '@/shared/components/common/infinite-combobox'
import http from '@/shared/utils/http'
import { urls } from '@/shared/constants/urls'

import { useLocationInfinite } from '../api/use-locations-infinite'

export default function LocationCombobox(props: {
	onSelect?: (val: string) => void
	defaultValue?: string
}) {
	return (
		<InfiniteCombobox
			{...props}
			useInfiniteQuery={({ search }) =>
				useLocationInfinite({ search, limit: '10' })
			}
			fetchItemById={fetchItemById}
			label={(item) => item.name}
			placeholder='Pilih lokasi'
		/>
	)
}

const fetchItemById = async (id: string) => {
	const { data } = await http(`${urls.location}/${id}`)
	return data.data ?? null
}

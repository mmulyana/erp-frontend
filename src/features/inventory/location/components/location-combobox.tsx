import InfiniteCombobox from '@/shared/components/common/infinite-combobox'

import { useLocationInfinite } from '../api/use-locations-infinite'
import { useLocation } from '../api/use-location'

export default function LocationCombobox(props: {
	onSelect?: (val: string) => void
	defaultValue?: string
}) {
	return (
		<InfiniteCombobox
			{...props}
			useInfiniteQuery={({ search }) =>
				useLocationInfinite({ search, limit: 10 })
			}
			fetchItemById={async (id) => {
				const { data } = await useLocation({ id })
				return data?.data ?? null
			}}
			label={(item) => item.name}
			placeholder='Pilih lokasi'
		/>
	)
}

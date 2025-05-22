import { Check } from 'lucide-react'

import { urls } from '@/shared/constants/urls'
import InfiniteCombobox from '@/shared/components/common/infinite-combobox'
import PhotoUrl from '@/shared/components/common/photo-url'
import http from '@/shared/utils/http'

import { useUserInfinite } from '../api/use-user-infinite'

export default function UserCombobox(props: {
	onSelect?: (val: string) => void
	defaultValue?: string
}) {
	return (
		<InfiniteCombobox
			{...props}
			useInfiniteQuery={({ search }) =>
				useUserInfinite({ search, limit: '10' })
			}
			defaultValue={props.defaultValue}
			fetchItemById={fetchItemById}
			label={(item) => item.username}
			placeholder='Pilih user'
			renderItem={(item, isSelected) => {
				return (
					<div className='flex gap-2 justify-between w-full items-center'>
						<div className='flex gap-2 items-center'>
							<PhotoUrl url={item.PhotoUrl} style={{ img: 'h-10 w-10' }} />
							<p>{item.username}</p>
						</div>
						{isSelected && <Check className='h-4 w-4' />}
					</div>
				)
			}}
		/>
	)
}

const fetchItemById = async (id: string) => {
	const { data } = await http(`${urls.user}/${id}`)
	return data.data.data ?? null
}

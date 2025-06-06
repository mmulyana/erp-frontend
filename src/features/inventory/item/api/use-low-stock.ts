import { useQuery } from '@tanstack/react-query'

import { keys } from '@/shared/constants/keys'
import { urls } from '@/shared/constants/urls'
import { Inventory } from '@/shared/types/api'
import { IApi } from '@/shared/types'
import http from '@/shared/utils/http'

export const useLowStock = () => {
	return useQuery({
		queryKey: [keys.itemLowStock],
		queryFn: async (): Promise<IApi<Inventory[]>> => {
			const { data } = await http(urls.item + '/data/low-stock')
			return data
		},
	})
}

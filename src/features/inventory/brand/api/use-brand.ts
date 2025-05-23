import { useQuery } from '@tanstack/react-query'

import { BrandInventory } from '@/shared/types/api'
import { keys } from '@/shared/constants/keys'
import { urls } from '@/shared/constants/urls'
import http from '@/shared/utils/http'
import { IApi } from '@/shared/types'

type Params = {
	id?: string
}

export const useBrand = (params?: Params) => {
	return useQuery({
		queryKey: [keys.brandDetail, params?.id],
		queryFn: async (): Promise<IApi<BrandInventory>> => {
			const { data } = await http(`${urls.brand}/${params?.id}`, {
				params,
			})
			return data
		},
		enabled:
			params?.id !== null && params?.id !== undefined && params?.id !== '',
	})
}

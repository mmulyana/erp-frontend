import { useQuery } from '@tanstack/react-query'

import { IApiPagination } from '@/shared/types'

import { keys } from '@/shared/constants/keys'
import { urls } from '@/shared/constants/urls'
import http from '@/shared/utils/http'

type Params = {
	search?: string
	page?: string
	limit?: string
}

export const useBrandsInfinite = (params?: Params) => {
	return useQuery({
		queryKey: [keys.brandInfinite, params],
		queryFn: async (): Promise<IApiPagination<any[]>> => {
			const { data } = await http(urls.inventoryLocation + 'data/infinite', {
				params,
			})
			return data
		},
	})
}

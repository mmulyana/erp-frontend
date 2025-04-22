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

export const useBrands = (params?: Params) => {
	return useQuery({
		queryKey: [keys.brand, params],
		queryFn: async (): Promise<IApiPagination<any[]>> => {
			const { data } = await http(urls.inventoryBrand, {
				params,
			})
			return data
		},
	})
}

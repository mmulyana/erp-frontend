import { useQuery } from '@tanstack/react-query'

import { IApiPagination, Pagination } from '@/shared/types'
import { BrandInventory } from '@/shared/types/api'
import { keys } from '@/shared/constants/keys'
import { urls } from '@/shared/constants/urls'
import http from '@/shared/utils/http'

export const useBrands = (params?: Pagination) => {
	return useQuery({
		queryKey: [keys.brand, params],
		queryFn: async (): Promise<IApiPagination<BrandInventory[]>> => {
			const { data } = await http(urls.brand, {
				params,
			})
			return data
		},
	})
}

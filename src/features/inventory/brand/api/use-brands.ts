import { useQuery } from '@tanstack/react-query'

import { IApiPagination, Pagination } from '@/shared/types'
import { keys } from '@/shared/constants/keys'
import { urls } from '@/shared/constants/urls'
import http from '@/shared/utils/http'

export const useBrands = (params?: Pagination) => {
	return useQuery({
		queryKey: [keys.brand, params],
		queryFn: async (): Promise<IApiPagination<any[]>> => {
			const { data } = await http(urls.brand, {
				params,
			})
			return data
		},
	})
}

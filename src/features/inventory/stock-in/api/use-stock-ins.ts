import { useQuery } from '@tanstack/react-query'

import { IApiPagination, Pagination } from '@/shared/types'
import { keys } from '@/shared/constants/keys'
import { urls } from '@/shared/constants/urls'
import http from '@/shared/utils/http'

import { StockIn } from '../type'

export const useStockIns = (params?: Pagination) => {
	return useQuery({
		queryKey: [keys.stockIn, params],
		queryFn: async (): Promise<IApiPagination<StockIn[]>> => {
			const { data } = await http(urls.stockIn, {
				params,
			})
			return data
		},
	})
}

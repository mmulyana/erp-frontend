import { useQuery } from '@tanstack/react-query'

import { IApiPagination } from '@/shared/types'
import { keys } from '@/shared/constants/keys'
import { urls } from '@/shared/constants/urls'
import http from '@/shared/utils/http'

import { StockIn } from '../type'

type Params = {
	search?: string
	page?: string
	limit?: string
}

export const useStockIns = (params?: Params) => {
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

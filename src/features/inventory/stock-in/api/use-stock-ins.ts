import { useQuery } from '@tanstack/react-query'

import { IApiPagination, Pagination } from '@/shared/types'
import { keys } from '@/shared/constants/keys'
import { urls } from '@/shared/constants/urls'
import { StockIn } from '@/shared/types/api'
import http from '@/shared/utils/http'

export const useStockIns = (
	params?: Pagination & {
		supplierId?: string
		createdBy?: string
		sortBy?: string
		sortOrder?: string
	}
) => {
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

import { useQuery } from '@tanstack/react-query'

import { IApiPagination, Pagination } from '@/shared/types'
import { keys } from '@/shared/constants/keys'
import { urls } from '@/shared/constants/urls'
import { StockOut } from '@/shared/types/api'
import http from '@/shared/utils/http'

export const useStockOuts = (
	params?: Pagination & {
		projectId?: string
		sortBy?: string
		sortOrder?: string
		createdBy?: string
	}
) => {
	return useQuery({
		queryKey: [keys.stockOut, params],
		queryFn: async (): Promise<IApiPagination<StockOut[]>> => {
			const { data } = await http(urls.stockOut, {
				params,
			})
			return data
		},
	})
}

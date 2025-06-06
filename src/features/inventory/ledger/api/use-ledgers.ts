import { useQuery } from '@tanstack/react-query'

import { StockLedger } from '@/shared/types/api'
import { IApiPagination, Pagination } from '@/shared/types'
import { keys } from '@/shared/constants/keys'
import { urls } from '@/shared/constants/urls'
import http from '@/shared/utils/http'

type params = Pagination & {
	itemId?: string
	type?: string
}
export const useLedgers = (params?: params) => {
	return useQuery({
		queryKey: [keys.ledger, params],
		queryFn: async (): Promise<IApiPagination<StockLedger[]>> => {
			const { data } = await http(urls.ledger, {
				params,
			})
			return data
		},
	})
}

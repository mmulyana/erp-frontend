import { useQuery } from '@tanstack/react-query'

import { IApiPagination, Pagination } from '@/shared/types'
import { StockLedger } from '@/shared/types/api'
import { keys } from '@/shared/constants/keys'
import { urls } from '@/shared/constants/urls'
import http from '@/shared/utils/http'

export const useLedgerActivity = (
	params?: Pagination & {
		startDate?: string
		endDate?: string
	}
) => {
	return useQuery({
		queryKey: [keys.ledgerActivity, params],
		queryFn: async (): Promise<IApiPagination<StockLedger[]>> => {
			const { data } = await http(urls.ledger + '/activity', {
				params,
			})
			return data
		},
		enabled:
			params?.startDate !== null &&
			params?.startDate !== undefined &&
			params?.startDate !== '' &&
			params?.endDate !== null &&
			params?.endDate !== undefined &&
			params?.endDate !== '',
	})
}

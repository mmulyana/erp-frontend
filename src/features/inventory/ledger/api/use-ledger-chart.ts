import { useQuery } from '@tanstack/react-query'

import { keys } from '@/shared/constants/keys'
import { urls } from '@/shared/constants/urls'
import { IApi } from '@/shared/types'
import http from '@/shared/utils/http'

export const useLedgerChart = (params?: {
	startDate?: string
	endDate?: string
}) => {
	return useQuery({
		queryKey: [keys.ledgerChart, params],
		queryFn: async (): Promise<
			IApi<
				{ date: string; stock_in: number; stock_out: number; loan: number }[]
			>
		> => {
			const { data } = await http(urls.ledger + '/chart', {
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

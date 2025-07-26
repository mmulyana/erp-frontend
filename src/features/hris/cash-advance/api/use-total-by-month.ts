import { useQuery } from '@tanstack/react-query'

import { keys } from '@/shared/constants/keys'
import { urls } from '@/shared/constants/urls'
import http from '@/shared/utils/http'
import { IApi } from '@/shared/types'

type Params = {
	year?: string
	month?: string
}

export const useTotalByMonth = (params?: Params) => {
	return useQuery({
		queryKey: [keys.cashAdvancesReport, params],
		queryFn: async (): Promise<
			IApi<{
				totalAmount: number
				percentage: number
			}>
		> => {
			const { data } = await http(urls.cashAdvances + '/report/by-month', {
				params,
			})
			return data
		},
		enabled:
			params?.month !== null &&
			params?.month !== undefined &&
			params.month !== '' &&
			params?.year !== null &&
			params?.year !== undefined &&
			params.year !== '',
	})
}

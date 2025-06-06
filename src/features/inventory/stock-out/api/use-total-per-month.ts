import { useQuery } from '@tanstack/react-query'

import { keys } from '@/shared/constants/keys'
import { urls } from '@/shared/constants/urls'
import http from '@/shared/utils/http'
import { IApi } from '@/shared/types'

type Params = {
	month?: string
	year?: string
}

export const useTotalPerMonth = (params?: Params) => {
	return useQuery({
		queryKey: [keys.stockOutReportByMonth, params],
		queryFn: async (): Promise<
			IApi<{
				total: number
				percentage: number
			}>
		> => {
			const { data } = await http(urls.stockOut + '/report/per-month', {
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

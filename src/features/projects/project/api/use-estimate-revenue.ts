import { useQuery } from '@tanstack/react-query'

import { keys } from '@/shared/constants/keys'
import { urls } from '@/shared/constants/urls'
import { IApi } from '@/shared/types'
import http from '@/shared/utils/http'

type Params = {
	month?: string
	year?: string
	status?: string
}

export const useEstimateRevenue = (params?: Params) => {
	return useQuery({
		queryKey: [keys.projectTotalEstimate, params],
		queryFn: async (): Promise<
			IApi<{
				total: number
			}>
		> => {
			const { data } = await http(urls.project + '/data/estimate-revenue', {
				params,
			})
			return data
		},
	})
}

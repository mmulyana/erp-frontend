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

export const useTotalNetValue = (params?: Params) => {
	return useQuery({
		queryKey: [keys.projectReportChart, params],
		queryFn: async (): Promise<
			IApi<{
				current: number
				previous: number
				percentage: number
			}>
		> => {
			const { data } = await http(urls.project + '/data/total-revenue', {
				params,
			})
			return data
		},
	})
}

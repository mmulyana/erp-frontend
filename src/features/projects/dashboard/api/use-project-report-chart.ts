import { useQuery } from '@tanstack/react-query'

import { keys } from '@/shared/constants/keys'
import { urls } from '@/shared/constants/urls'
import { IApi } from '@/shared/types'
import http from '@/shared/utils/http'

type Params = {
	startDate?: string
	endDate?: string
}

export const useProjectReportChart = (params?: Params) => {
	return useQuery({
		queryKey: [keys.projectReportChart, params],
		queryFn: async (): Promise<
			IApi<
				{
					date: string
					total: number
				}[]
			>
		> => {
			const { data } = await http(urls.project + '/data/report-chart', {
				params,
			})
			return data
		},
		enabled:
			params?.startDate !== null &&
			params?.startDate !== undefined &&
			params.startDate !== '' &&
			params?.endDate !== null &&
			params?.endDate !== undefined &&
			params.endDate !== '',
	})
}

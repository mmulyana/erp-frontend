import { useQuery } from '@tanstack/react-query'

import { keys } from '@/shared/constants/keys'
import { urls } from '@/shared/constants/urls'
import { IApi } from '@/shared/types'
import http from '@/shared/utils/http'

type Params = {
	month?: string
	year?: string
}

export const useProjectStatus = (params?: Params) => {
	return useQuery({
		queryKey: [keys.projectReportChart, params],
		queryFn: async (): Promise<
			IApi<
				{
					name: string
					total: number
					fill: string
				}[]
			>
		> => {
			const { data } = await http(urls.project + '/data/status-chart', {
				params,
			})
			return data
		},
	})
}

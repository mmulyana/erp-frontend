import { useQuery } from '@tanstack/react-query'

import { keys } from '@/shared/constants/keys'
import { urls } from '@/shared/constants/urls'
import { IApi } from '@/shared/types'
import http from '@/shared/utils/http'

type Params = {
	startDate?: string
	endDate?: string
}

export const useReportChart = (params?: Params) => {
	return useQuery({
		queryKey: [keys.overtimeReport, params],
		queryFn: async (): Promise<
			IApi<
				{
					date: string
					total: number
				}[]
			>
		> => {
			const { data } = await http(urls.overtime + '/report/chart', {
				params,
			})
			return data
		},
	})
}

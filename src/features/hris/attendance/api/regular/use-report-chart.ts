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
		queryKey: [keys.attendanceReport, params],
		queryFn: async (): Promise<
			IApi<
				{
					date: string
					presence: number
					absent: number
				}[]
			>
		> => {
			const { data } = await http(urls.attendance + '/report/chart', {
				params,
			})
			return data
		},
	})
}

import { useQuery } from '@tanstack/react-query'

import { keys } from '@/shared/constants/keys'
import { urls } from '@/shared/constants/urls'
import http from '@/shared/utils/http'
import { IApi } from '@/shared/types'

type Params = {
	date?: string
}

export const useReportByDate = (params?: Params) => {
	return useQuery({
		queryKey: [keys.attendanceByDate, params],
		queryFn: async (): Promise<
			IApi<{
				presence: {
					data: { date: string; total: number }[]
					percentage: number
				}
				absent: {
					data: { date: string; total: number }[]
					percentage: number
				}
			}>
		> => {
			const { data } = await http(urls.attendance + '/report/by-date', {
				params,
			})
			return data
		},
		enabled:
			params?.date !== undefined &&
			params?.date !== null &&
			params?.date !== '',
	})
}

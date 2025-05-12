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
		queryKey: [keys.overtimeByDate, params],
		queryFn: async (): Promise<
			IApi<{
				data: { date: string; total: number }[]
				percentage: number
			}>
		> => {
			const { data } = await http(urls.overtime + '/report/by-date', {
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

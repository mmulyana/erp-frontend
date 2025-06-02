import { useQuery } from '@tanstack/react-query'

import { keys } from '@/shared/constants/keys'
import { urls } from '@/shared/constants/urls'
import { IApi } from '@/shared/types'
import http from '@/shared/utils/http'

type Params = {
	startDate?: string
}

export const useReportAll = (params?: Params) => {
	return useQuery({
		queryKey: [keys.attendanceTotal, params],
		queryFn: async (): Promise<
			IApi<{
				presence: number
				absent: number
				notYet: number
				total: number
			}>
		> => {
			const { data } = await http(urls.attendance + '/report/all', {
				params,
			})
			return data
		},
		enabled:
			params?.startDate !== undefined &&
			params?.startDate !== null &&
			params?.startDate !== '',
	})
}

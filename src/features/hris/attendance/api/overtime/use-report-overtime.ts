import { useQuery } from '@tanstack/react-query'

import { IApiPagination } from '@/shared/types'
import { keys } from '@/shared/constants/keys'
import { urls } from '@/shared/constants/urls'
import http from '@/shared/utils/http'

type Params = {
	startDate?: string
	endDate?: string
	page?: string
	limit?: string
	search?: string
}

export const useReportOvertime = (params?: Params) => {
	return useQuery({
		queryKey: [keys.overtimeReport, params],
		queryFn: async (): Promise<
			IApiPagination<
				{
					id: string
					fullname: string
					overtimes: ({ id: string; totalHour: number } | null)[]
					total: number
				}[]
			>
		> => {
			const { data } = await http(urls.overtime + '/data/report', {
				params,
			})
			return data
		},
	})
}

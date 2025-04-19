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

export const useReportAttendance = (params?: Params) => {
	return useQuery({
		queryKey: [keys.attendanceReport, params],
		queryFn: async (): Promise<
			IApiPagination<
				{
					fullname: string
					attendance: string[]
					present: number
					absent: number
				}[]
			>
		> => {
			const { data } = await http(urls.attendance + '/report', {
				params,
			})
			return data
		},
	})
}

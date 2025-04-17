import { useQuery } from '@tanstack/react-query'

import { IApiPagination } from '@/shared/types'

import { keys } from '@/shared/constants/keys'
import { urls } from '@/shared/constants/urls'
import http from '@/shared/utils/http'
import { Attendance } from '../types'

type Params = {
	search?: string
	page?: string
	limit?: string
	startDate?: string
}

export const useAttendances = (params?: Params) => {
	return useQuery({
		queryKey: [keys.attendance, params],
		queryFn: async (): Promise<IApiPagination<Attendance[]>> => {
			const { data } = await http(urls.attendance, {
				params,
			})
			return data
		},
	})
}

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

export const useOvertimes = (params?: Params) => {
	return useQuery({
		queryKey: [keys.overtime, params],
		queryFn: async (): Promise<IApiPagination<any[]>> => {
			const { data } = await http(urls.overtime, {
				params,
			})
			return data
		},
	})
}

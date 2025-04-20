import { useQuery } from '@tanstack/react-query'

import { IApiPagination } from '@/shared/types'
import { keys } from '@/shared/constants/keys'
import { urls } from '@/shared/constants/urls'
import http from '@/shared/utils/http'
import { Overtime } from '../../_types'

type params = {
	startDate?: string
	endDate?: string
	id?: string
	search?: string
	page?: string
	limit?: string
}
export const useDataOvertime = (params?: params) => {
	return useQuery({
		queryKey: [keys.employeeData, 'overtime', params],
		queryFn: async (): Promise<IApiPagination<Overtime[]>> => {
			const { data } = await http(
				`${urls.employee}/${params?.id}/data/overtime`,
				{
					params: {
						startDate: params?.startDate,
						endDate: params?.endDate,
						search: params?.search,
						page: params?.page,
						limit: params?.limit,
					},
				}
			)
			return data
		},
		enabled:
			params?.id !== null && params?.id !== undefined && params?.id !== '',
	})
}

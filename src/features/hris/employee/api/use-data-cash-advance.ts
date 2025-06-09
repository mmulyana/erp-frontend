import { useQuery } from '@tanstack/react-query'

import { IApiPagination } from '@/shared/types'
import { keys } from '@/shared/constants/keys'
import { urls } from '@/shared/constants/urls'
import http from '@/shared/utils/http'

type params = {
	id?: string
	search?: string
	page?: string
	limit?: string
}
export const useDataCashAdvance = (params?: params) => {
	return useQuery({
		queryKey: [keys.employeeData, 'cash-advance', params],
		queryFn: async (): Promise<
			IApiPagination<
				{ id: string; amount: number; note?: string; date: string }[]
			>
		> => {
			const { data } = await http(
				`${urls.employee}/${params?.id}/data/cash-advance`,
				{
					params: {
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

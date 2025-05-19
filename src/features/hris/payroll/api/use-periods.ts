import { useQuery } from '@tanstack/react-query'

import { IApiPagination, Pagination } from '@/shared/types'
import { keys } from '@/shared/constants/keys'
import { urls } from '@/shared/constants/urls'
import http from '@/shared/utils/http'

export const usePeriods = (params?: Pagination) => {
	return useQuery({
		queryKey: [keys.payrollPeriod, params],
		queryFn: async (): Promise<IApiPagination<any[]>> => {
			const { data } = await http(urls.payrollPeriod, {
				params,
			})
			return data
		},
	})
}

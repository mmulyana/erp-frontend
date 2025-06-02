import { useQuery } from '@tanstack/react-query'

import { IApiPagination, Pagination } from '@/shared/types'
import { keys } from '@/shared/constants/keys'
import { urls } from '@/shared/constants/urls'
import { Overtime } from '@/shared/types/api'
import http from '@/shared/utils/http'

type Params = Pagination & {
	startDate?: string
}

export const useOvertimes = (params?: Params) => {
	return useQuery({
		queryKey: [keys.overtime, params],
		queryFn: async (): Promise<IApiPagination<Overtime[]>> => {
			const { data } = await http(urls.overtime, {
				params,
			})
			return data
		},
	})
}

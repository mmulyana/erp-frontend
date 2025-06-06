import { useQuery } from '@tanstack/react-query'

import { IApiPagination, Pagination } from '@/shared/types'

import { keys } from '@/shared/constants/keys'
import { urls } from '@/shared/constants/urls'
import http from '@/shared/utils/http'

export const useLocations = (params?: Pagination) => {
	return useQuery({
		queryKey: [keys.location, params],
		queryFn: async (): Promise<IApiPagination<any[]>> => {
			const { data } = await http(urls.location, {
				params,
			})
			return data
		},
	})
}

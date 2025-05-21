import { useQuery } from '@tanstack/react-query'

import { IApiPagination, Pagination } from '@/shared/types'
import { keys } from '@/shared/constants/keys'
import { urls } from '@/shared/constants/urls'
import http from '@/shared/utils/http'
import { Client } from '../types'

export const useClients = (params?: Pagination) => {
	return useQuery({
		queryKey: [keys.client, params],
		queryFn: async (): Promise<IApiPagination<Client[]>> => {
			const { data } = await http(urls.client, {
				params,
			})
			return data
		},
	})
}

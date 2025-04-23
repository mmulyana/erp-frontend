import { useQuery } from '@tanstack/react-query'

import { IApiPagination } from '@/shared/types'
import { keys } from '@/shared/constants/keys'
import { urls } from '@/shared/constants/urls'
import http from '@/shared/utils/http'
import { Client } from '../types'

type Params = {
	search?: string
	page?: string
	limit?: string
}

export const useClients = (params?: Params) => {
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

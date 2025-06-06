import { useQuery } from '@tanstack/react-query'

import { IApi, IApiPagination, Pagination } from '@/shared/types'
import { keys } from '@/shared/constants/keys'
import { urls } from '@/shared/constants/urls'
import http from '@/shared/utils/http'
import { Client } from '@/shared/types/api'

export const useClientRank = (
	params?: Pagination & {
		sortOrder?: string
	}
) => {
	return useQuery({
		queryKey: [keys.clientRangking, params],
		queryFn: async (): Promise<IApi<Client[]>> => {
			const { data } = await http(urls.client + '/data/client-rank', {
				params,
			})
			return data
		},
	})
}

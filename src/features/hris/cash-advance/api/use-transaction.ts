import { useQuery } from '@tanstack/react-query'

import { IApiPagination } from '@/shared/types'

import { keys } from '@/shared/constants/keys'
import { urls } from '@/shared/constants/urls'
import http from '@/shared/utils/http'

type Params = {
	search?: string
	page?: string
	limit?: string
	id?: string
}

export const useTransactions = (params?: Params) => {
	return useQuery({
		queryKey: [keys.cashAdvanceTransactions, params.id, params],
		queryFn: async (): Promise<IApiPagination<any[]>> => {
			const { data } = await http(
				`${urls.cashAdvances}/${params?.id}/transaction`,
				{
					params,
				}
			)
			return data
		},
		enabled:
			params?.id !== null && params?.id !== undefined && params?.id !== '',
	})
}

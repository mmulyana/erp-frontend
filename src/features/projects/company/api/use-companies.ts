import { useQuery } from '@tanstack/react-query'

import { IApiPagination } from '@/shared/types'
import { keys } from '@/shared/constants/keys'
import { urls } from '@/shared/constants/urls'
import http from '@/shared/utils/http'
import { Company } from '../types'

type Params = {
	search?: string
	page?: string
	limit?: string
}

export const useCompanies = (params?: Params) => {
	return useQuery({
		queryKey: [keys.companyClient, params],
		queryFn: async (): Promise<IApiPagination<Company[]>> => {
			const { data } = await http(urls.companyClient, {
				params,
			})
			return data
		},
	})
}

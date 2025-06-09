import { useQuery } from '@tanstack/react-query'

import { CompanyClient } from '@/shared/types/api'
import { IApiPagination, Pagination } from '@/shared/types'
import { keys } from '@/shared/constants/keys'
import { urls } from '@/shared/constants/urls'
import http from '@/shared/utils/http'

export const useCompanies = (
	params?: Pagination & {
		sortOrder?: string
	}
) => {
	return useQuery({
		queryKey: [keys.companyClient, params],
		queryFn: async (): Promise<IApiPagination<CompanyClient[]>> => {
			const { data } = await http(urls.companyClient, {
				params,
			})
			return data
		},
	})
}

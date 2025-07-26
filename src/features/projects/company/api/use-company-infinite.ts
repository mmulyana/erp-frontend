import { useInfiniteQuery } from '@tanstack/react-query'

import { NormalizedResponse, Pagination } from '@/shared/types'
import { CompanyClient } from '@/shared/types/api'
import { keys } from '@/shared/constants/keys'
import { urls } from '@/shared/constants/urls'
import http from '@/shared/utils/http'

export function useCompanyInfinite(params: Pagination) {
	return useInfiniteQuery<NormalizedResponse<CompanyClient>>({
		queryKey: [keys.companyClientInfinite, params],
		queryFn: async ({ pageParam = 1 }) => {
			const { data } = await http(urls.companyClient + '/data/infinite', {
				params: {
					...params,
					limit: String(params.limit),
					page: pageParam,
				},
			})

			return {
				data: data.data.data,
				nextPage: data.data.nextPage,
			}
		},
		getNextPageParam: (lastPage) => lastPage.nextPage,
		initialPageParam: 1,
	})
}

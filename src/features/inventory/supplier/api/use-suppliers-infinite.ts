import { useInfiniteQuery } from '@tanstack/react-query'

import { NormalizedResponse, Pagination } from '@/shared/types'
import { keys } from '@/shared/constants/keys'
import { urls } from '@/shared/constants/urls'
import http from '@/shared/utils/http'
import { Supplier } from '../types'

export function useSupplierInfinite(params: Pagination) {
	return useInfiniteQuery<NormalizedResponse<Supplier>>({
		queryKey: [keys.supplierInfinite, params],
		queryFn: async ({ pageParam = 1 }) => {
			const { data } = await http(urls.supplier + '/data/infinite', {
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

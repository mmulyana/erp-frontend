import { useInfiniteQuery } from '@tanstack/react-query'

import { NormalizedResponse, Pagination } from '@/shared/types'
import { keys } from '@/shared/constants/keys'
import { urls } from '@/shared/constants/urls'
import { Inventory } from '@/shared/types/api'
import http from '@/shared/utils/http'

export function useItemInfinite(params: Pagination) {
	return useInfiniteQuery<NormalizedResponse<Inventory>>({
		queryKey: [keys.itemInfinite, params],
		queryFn: async ({ pageParam = 1 }) => {
			const { data } = await http(urls.item + '/data/infinite', {
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

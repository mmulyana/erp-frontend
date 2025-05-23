import { useInfiniteQuery } from '@tanstack/react-query'

import { BrandInventory } from '@/shared/types/api'
import { keys } from '@/shared/constants/keys'
import { urls } from '@/shared/constants/urls'
import { Pagination } from '@/shared/types'
import http from '@/shared/utils/http'

type NormalizedResponse = {
	data: BrandInventory[]
	nextPage?: number
}

export function useBrandInfinite(params: Pagination) {
	return useInfiniteQuery<NormalizedResponse>({
		queryKey: [keys.brandInfinite, params],
		queryFn: async ({ pageParam = 1 }) => {
			const { data } = await http(urls.brand + '/data/infinite', {
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

import { useInfiniteQuery } from '@tanstack/react-query'

import { NormalizedResponse } from '@/shared/types'
import { keys } from '@/shared/constants/keys'
import { urls } from '@/shared/constants/urls'
import http from '@/shared/utils/http'

import { Item } from '../types'

type Params = {
	search?: string
	limit?: number
	page?: string
}

export function useItemInfinite(params: Params) {
	return useInfiniteQuery<NormalizedResponse<Item>>({
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

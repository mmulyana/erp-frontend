import { useInfiniteQuery } from '@tanstack/react-query'

import { keys } from '@/shared/constants/keys'
import { urls } from '@/shared/constants/urls'
import http from '@/shared/utils/http'
import { Location } from '../types'
import { Pagination } from '@/shared/types'

type NormalizedResponse = {
	data: Location[]
	nextPage?: number
}

export function useLocationInfinite(params: Pagination) {
	return useInfiniteQuery<NormalizedResponse>({
		queryKey: [keys.locationInfinite, params],
		queryFn: async ({ pageParam = 1 }) => {
			const { data } = await http(urls.location + '/data/infinite', {
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

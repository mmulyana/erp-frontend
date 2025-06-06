import { useInfiniteQuery } from '@tanstack/react-query'

import { keys } from '@/shared/constants/keys'
import { urls } from '@/shared/constants/urls'
import { Pagination } from '@/shared/types'
import http from '@/shared/utils/http'
import { User } from '@/shared/types/api'

type NormalizedResponse = {
	data: User[]
	nextPage?: number
}

export function useUserInfinite(params: Pagination) {
	return useInfiniteQuery<NormalizedResponse>({
		queryKey: [keys.userInfinite, params],
		queryFn: async ({ pageParam = 1 }) => {
			const { data } = await http(urls.user + '/data/infinite', {
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

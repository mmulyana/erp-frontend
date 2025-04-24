import { useInfiniteQuery } from '@tanstack/react-query'

import { keys } from '@/shared/constants/keys'
import { urls } from '@/shared/constants/urls'
import http from '@/shared/utils/http'
import { Project } from '../types'
import { NormalizedResponse } from '@/shared/types'

type Params = {
	search?: string
	limit?: number
	page?: string
}

export function useProjectInfinite(params: Params) {
	return useInfiniteQuery<NormalizedResponse<Project>>({
		queryKey: [keys.projectInfinite, params],
		queryFn: async ({ pageParam = 1 }) => {
			const { data } = await http(urls.project + '/data/infinite', {
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

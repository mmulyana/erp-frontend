import { useInfiniteQuery } from '@tanstack/react-query'

import { Employee, NormalizedResponse } from '@/shared/types'
import { keys } from '@/shared/constants/keys'
import { urls } from '@/shared/constants/urls'
import http from '@/shared/utils/http'

type Params = {
	search?: string
	limit?: number
	page?: string
}

export function useEmployeeInfinite(params: Params) {
	return useInfiniteQuery<NormalizedResponse<Employee>>({
		queryKey: [keys.employeeInfinite, params],
		queryFn: async ({ pageParam = 1 }) => {
			const { data } = await http(urls.employee + '/data/infinite', {
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

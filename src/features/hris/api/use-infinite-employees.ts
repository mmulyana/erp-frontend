import { useInfiniteQuery } from '@tanstack/react-query'
import axios from 'axios'

import { keys } from '@/shared/constants/keys'
import { urls } from '@/shared/constants/urls'
import { Employee } from '@/shared/types'

type ApiResponse = {
	data: {
		data: Employee[]
		nextPage?: number
	}
}

type NormalizedResponse = {
	data: Employee[]
	nextPage?: number
}

type Params = {
	search?: string
}

export function useInfiniteEmployees(params: Params) {
	return useInfiniteQuery<NormalizedResponse>({
		queryKey: [keys.employeeInfinite, params],
		queryFn: async ({ pageParam = 1 }) => {
			const { data } = await axios.get<ApiResponse>(
				urls.employee + '/data/infinite',
				{
					params: {
						...params,
						page: pageParam,
					},
				}
			)

			return {
				data: data.data.data,
				nextPage: data.data.nextPage,
			}
		},
		getNextPageParam: (lastPage) => lastPage.nextPage,
		initialPageParam: 1,
	})
}

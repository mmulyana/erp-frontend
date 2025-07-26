import { useQuery } from '@tanstack/react-query'

import { IApiPagination, Pagination } from '@/shared/types'
import { keys } from '@/shared/constants/keys'
import { urls } from '@/shared/constants/urls'
import { User } from '@/shared/types/api'
import http from '@/shared/utils/http'

export const useUsers = (params?: Pagination) => {
	return useQuery({
		queryKey: [keys.user, params],
		queryFn: async (): Promise<IApiPagination<User[]>> => {
			const { data } = await http(`${urls.user}`, {
				params,
			})
			return data
		},
	})
}

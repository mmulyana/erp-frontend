import { useQuery } from '@tanstack/react-query'

import { IApiPagination, Pagination } from '@/shared/types'
import { keys } from '@/shared/constants/keys'
import { urls } from '@/shared/constants/urls'
import { Role } from '@/shared/types/api'
import http from '@/shared/utils/http'

export const useRoles = (params?: Pagination) => {
	return useQuery({
		queryKey: [keys.roles, params],
		queryFn: async (): Promise<IApiPagination<Role[]>> => {
			const { data } = await http(`${urls.role}`, {
				params,
			})
			return data
		},
	})
}

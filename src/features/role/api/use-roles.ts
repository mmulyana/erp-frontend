import { useQuery } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'

import { IApi, IApiPagination, Role } from '@/utils/types/api'
import { KEYS } from '@/utils/constant/_keys'
import { URLS } from '@/utils/constant/_urls'
import http from '@/utils/http'

export const useRoles = (params?: { search?: string }) => {
	return useQuery({
		queryKey: [KEYS.ROLES, params?.search],
		queryFn: async (): Promise<AxiosResponse<IApiPagination<Role[]>>> => {
			return await http(URLS.ROLE, { params })
		},
	})
}

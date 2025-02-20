import { useQuery } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'

import { IApi, IApiPagination } from '@/utils/types/api'
import { keys } from '@/utils/constant/_keys'
import { urls } from '@/utils/constant/_urls'
import http from '@/utils/http'

import { Role } from '../type'

export const useRoles = (params?: { search?: string }) => {
	return useQuery({
		queryKey: [keys.roles, params?.search],
		queryFn: async (): Promise<AxiosResponse<IApiPagination<Role[]>>> => {
			return await http(urls.role, { params })
		},
	})
}

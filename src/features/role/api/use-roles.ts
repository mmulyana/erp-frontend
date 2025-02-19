import { useQuery } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'

import { IApi, Role } from '@/utils/types/api'
import { KEYS } from '@/utils/constant/_keys'
import { URLS } from '@/utils/constant/_urls'
import http from '@/utils/http'

export const useRoles = (params?: { name?: string }) => {
	return useQuery({
		queryKey: [KEYS.ROLES, params?.name],
		queryFn: async (): Promise<AxiosResponse<IApi<{ roles: Role[] }>>> => {
			return await http(URLS.ROLE, { params })
		},
	})
}

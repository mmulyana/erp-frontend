import { useQuery } from '@tanstack/react-query'

import { keys } from '@/shared/constants/keys'
import { urls } from '@/shared/constants/urls'
import { Role } from '@/shared/types/api'
import { IApi } from '@/shared/types'
import http from '@/shared/utils/http'

type Params = {
	id?: string
}

export const useRole = (params?: Params) => {
	return useQuery({
		queryKey: [keys.rolesDetail, params?.id],
		queryFn: async (): Promise<IApi<Role>> => {
    const { data } = await http(`${urls.role}/${params?.id}`, {
				params,
			})
			return data
		},
		enabled:
			params?.id !== null && params?.id !== undefined && params?.id !== '',
	})
}

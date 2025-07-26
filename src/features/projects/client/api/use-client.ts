import { useQuery } from '@tanstack/react-query'

import { keys } from '@/shared/constants/keys'
import { urls } from '@/shared/constants/urls'
import http from '@/shared/utils/http'
import { IApi } from '@/shared/types'
import { Client } from '../types'

type Params = {
	id?: string
}

export const useClient = (params?: Params) => {
	return useQuery({
		queryKey: [keys.clientDetail, params?.id],
		queryFn: async (): Promise<IApi<Client>> => {
			const { data } = await http.get<IApi<Client>>(
				`${urls.client}/${params?.id}`,
				{
					params,
				}
			)
			return data
		},
		enabled:
			params?.id !== null && params?.id !== undefined && params?.id !== '',
	})
}

import { useQuery } from '@tanstack/react-query'

import { CommandGrouped } from '@/shared/types/api'
import { keys } from '@/shared/constants/keys'
import { urls } from '@/shared/constants/urls'
import { IApi } from '@/shared/types'
import http from '@/shared/utils/http'

type params = {
	q: string
	types?: string[]
}

export const useCommand = (params: params) => {
	return useQuery({
		queryKey: [keys.command, params],
		queryFn: async (): Promise<IApi<CommandGrouped>> => {
			const { data } = await http.get(urls.command, {
				params: {
					q: params.q,
					types: params.types?.join(','),
				},
			})
			return data
		},
	})
}

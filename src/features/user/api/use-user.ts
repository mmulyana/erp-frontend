import { useQuery } from '@tanstack/react-query'

import { keys } from '@/shared/constants/keys'
import { urls } from '@/shared/constants/urls'
import { User } from '@/shared/types/api'
import { IApi } from '@/shared/types'
import http from '@/shared/utils/http'

type Params = {
	id?: string
}

export const useUser = (params?: Params) => {
	return useQuery({
		queryKey: [keys.userDetail, params?.id],
		queryFn: async (): Promise<IApi<User>> => {
			const { data } = await http(`${urls.user}/${params?.id}`, {
				params,
			})
			return data.data
		},
		enabled:
			params?.id !== null && params?.id !== undefined && params?.id !== '',
	})
}

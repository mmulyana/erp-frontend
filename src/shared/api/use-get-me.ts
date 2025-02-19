import { useQuery } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'

import { IApi, User } from '@/utils/types/api'
import { KEYS } from '@/utils/constant/_keys'
import { URLS } from '@/utils/constant/_urls'
import http from '@/utils/http'

export const useGetme = () => {
	return useQuery({
		queryKey: [KEYS.ME],
		queryFn: async (): Promise<AxiosResponse<IApi<User>>> => {
			return await http(URLS.ME)
		},
	})
}

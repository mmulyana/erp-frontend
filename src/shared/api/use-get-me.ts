import { useQuery } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'

import { IApi, User } from '@/utils/types/api'
import { keys } from '@/utils/constant/_keys'
import { urls } from '@/utils/constant/_urls'
import http from '@/utils/http'

export const useGetme = () => {
	return useQuery({
		queryKey: [keys.me],
		queryFn: async (): Promise<AxiosResponse<IApi<User>>> => {
			return await http(urls.me)
		},
	})
}

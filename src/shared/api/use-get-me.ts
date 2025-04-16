import { useQuery } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'

import { keys } from '@/shared/constants/keys'
import { urls } from '@/shared/constants/urls'
import http from '@/shared/utils/http'
import { IApi } from '../types'

export const useGetme = () => {
	return useQuery({
		queryKey: [keys.me],
		queryFn: async (): Promise<AxiosResponse<IApi<any>>> => {
			return await http(urls.me)
		},
	})
}

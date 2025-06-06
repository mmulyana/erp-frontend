import { useQuery } from '@tanstack/react-query'

import { keys } from '@/shared/constants/keys'
import { urls } from '@/shared/constants/urls'
import http from '@/shared/utils/http'

import { IApi } from '../types'
import { User } from '../types/api'

export const useGetme = () => {
	return useQuery({
		queryKey: [keys.me],
		queryFn: async (): Promise<IApi<User>> => {
			const { data } = await http(urls.me)
			return data
		},
	})
}

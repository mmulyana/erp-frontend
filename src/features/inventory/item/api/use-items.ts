import { useQuery } from '@tanstack/react-query'

import { IApiPagination, Pagination } from '@/shared/types'

import { keys } from '@/shared/constants/keys'
import { urls } from '@/shared/constants/urls'
import http from '@/shared/utils/http'

import { Item } from '../types'

export const useItems = (params?: Pagination) => {
	return useQuery({
		queryKey: [keys.item, params],
		queryFn: async (): Promise<IApiPagination<Item[]>> => {
			const { data } = await http(urls.item, {
				params,
			})
			return data
		},
	})
}

import { useQuery } from '@tanstack/react-query'

import { IApiPagination, Pagination } from '@/shared/types'
import { keys } from '@/shared/constants/keys'
import { urls } from '@/shared/constants/urls'
import http from '@/shared/utils/http'
import { Supplier } from '../types'

export const useSuppliers = (params?: Pagination) => {
	return useQuery({
		queryKey: [keys.supplier, params],
		queryFn: async (): Promise<IApiPagination<Supplier[]>> => {
			const { data } = await http(urls.supplier, {
				params,
			})
			return data
		},
	})
}

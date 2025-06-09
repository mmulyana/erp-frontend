import { useQuery } from '@tanstack/react-query'

import { IApiPagination, Pagination } from '@/shared/types'

import { keys } from '@/shared/constants/keys'
import { urls } from '@/shared/constants/urls'
import { Inventory } from '@/shared/types/api'
import http from '@/shared/utils/http'

export const useItems = (
	params?: Pagination & {
		brandId?: string
		warehouseId?: string
		status?: string
	}
) => {
	return useQuery({
		queryKey: [keys.item, params],
		queryFn: async (): Promise<IApiPagination<Inventory[]>> => {
			const { data } = await http(urls.item, {
				params,
			})
			return data
		},
	})
}

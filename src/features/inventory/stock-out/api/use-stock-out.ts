import { useQuery } from '@tanstack/react-query'

import { IApi, IApiPagination } from '@/shared/types'
import { keys } from '@/shared/constants/keys'
import { urls } from '@/shared/constants/urls'
import http from '@/shared/utils/http'
import { StockOut } from '../types'

type Params = {
	id?: string
}

export const useStockOut = (params?: Params) => {
	return useQuery({
		queryKey: [keys.stockInDetail, params?.id],
		queryFn: async (): Promise<IApi<StockOut>> => {
			const { data } = await http(`${urls.stockOut}/${params?.id}`)
			return data.data
		},
		enabled:
			params?.id !== undefined && params.id !== undefined && params.id !== '',
	})
}

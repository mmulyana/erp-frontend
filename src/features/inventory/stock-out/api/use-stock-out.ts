import { useQuery } from '@tanstack/react-query'

import { keys } from '@/shared/constants/keys'
import { urls } from '@/shared/constants/urls'
import { StockOut } from '@/shared/types/api'
import { IApi } from '@/shared/types'
import http from '@/shared/utils/http'

type Params = {
	id?: string
}

export const useStockOut = (params?: Params) => {
	return useQuery({
		queryKey: [keys.stockOutDetail, params?.id],
		queryFn: async (): Promise<IApi<StockOut>> => {
			const { data } = await http(`${urls.stockOut}/${params?.id}`)
			return data.data
		},
		enabled:
			params?.id !== undefined && params.id !== undefined && params.id !== '',
	})
}

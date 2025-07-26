import { useQuery } from '@tanstack/react-query'

import { keys } from '@/shared/constants/keys'
import { urls } from '@/shared/constants/urls'
import http from '@/shared/utils/http'
import { IApi } from '@/shared/types'
import { StockIn } from '@/shared/types/api'

type Params = {
	id?: string
}

export const useStockIn = (params?: Params) => {
	return useQuery({
		queryKey: [keys.stockInDetail, params?.id],
		queryFn: async (): Promise<IApi<StockIn & { photoUrl?: string }>> => {
			const { data } = await http(`${urls.stockIn}/${params?.id}`)
			return data.data
		},
		enabled:
			params?.id !== undefined && params?.id !== null && params.id !== '',
	})
}

import { useQuery } from '@tanstack/react-query'

import { keys } from '@/shared/constants/keys'
import { urls } from '@/shared/constants/urls'
import { Inventory } from '@/shared/types/api'
import { IApi } from '@/shared/types'
import http from '@/shared/utils/http'

type Params = {
	id?: string
}

export const useItem = (params?: Params) => {
	return useQuery({
		queryKey: [keys.itemDetail, params?.id],
		queryFn: async (): Promise<IApi<Inventory>> => {
			const { data } = await http(`${urls.item}/${params?.id}`, {
				params,
			})
			return data
		},
		enabled:
			params?.id !== null && params?.id !== undefined && params?.id !== '',
	})
}

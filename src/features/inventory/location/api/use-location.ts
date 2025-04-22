import { useQuery } from '@tanstack/react-query'

import { keys } from '@/shared/constants/keys'
import { urls } from '@/shared/constants/urls'
import http from '@/shared/utils/http'
import { IApi } from '@/shared/types'

type Params = {
	id?: string
}

export const useLocation = (params?: Params) => {
	return useQuery({
		queryKey: [keys.locationDetail, params?.id],
		queryFn: async (): Promise<IApi<any>> => {
			const { data } = await http(`${urls.inventoryLocation}/${params?.id}`, {
				params,
			})
			return data
		},
		enabled:
			params?.id !== null && params?.id !== undefined && params?.id !== '',
	})
}

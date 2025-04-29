import { useQuery } from '@tanstack/react-query'

import { keys } from '@/shared/constants/keys'
import { urls } from '@/shared/constants/urls'
import http from '@/shared/utils/http'
import { IApi } from '@/shared/types'
import { Supplier } from '../types'

type Params = {
	id?: string
}

export const useSupplier = (params?: Params) => {
	return useQuery({
		queryKey: [keys.supplierDetail, params?.id],
		queryFn: async (): Promise<IApi<Supplier>> => {
			const { data } = await http(`${urls.supplier}/${params?.id}`, {
				params,
			})
			return data
		},
		enabled:
			params?.id !== null && params?.id !== undefined && params?.id !== '',
	})
}

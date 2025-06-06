import { useQuery } from '@tanstack/react-query'

import { keys } from '@/shared/constants/keys'
import { urls } from '@/shared/constants/urls'
import { Inventory } from '@/shared/types/api'
import { IApi } from '@/shared/types'
import http from '@/shared/utils/http'

type Params = {
	id?: string
}

export const useSupplierItem = (params?: Params) => {
	return useQuery({
		queryKey: [keys.itemSupplier, params?.id],
		queryFn: async (): Promise<
			IApi<
				{
					supplierId: string
					name: string
					stockInId: string
					photoUrl?: string
					date?: string
				}[]
			>
		> => {
			const { data } = await http(`${urls.item}/${params?.id}/supplier`, {
				params,
			})
			return data
		},
		enabled:
			params?.id !== null && params?.id !== undefined && params?.id !== '',
	})
}

import { useQuery } from '@tanstack/react-query'

import { keys } from '@/shared/constants/keys'
import { urls } from '@/shared/constants/urls'
import { IApi } from '@/shared/types'
import http from '@/shared/utils/http'

export const useTotalSupplier = () => {
	return useQuery({
		queryKey: [keys.supplierTotal],
		queryFn: async (): Promise<IApi<number>> => {
			const { data } = await http(urls.supplier + '/data/total')
			return data
		},
	})
}

import { useQuery } from '@tanstack/react-query'

import { keys } from '@/shared/constants/keys'
import { urls } from '@/shared/constants/urls'
import { IApi } from '@/shared/types'
import http from '@/shared/utils/http'

export const useTotalItem = () => {
	return useQuery({
		queryKey: [keys.itemTotal],
		queryFn: async (): Promise<IApi<number>> => {
			const { data } = await http(urls.item + '/data/total')
			return data
		},
	})
}

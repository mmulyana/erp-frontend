import { useQuery } from '@tanstack/react-query'

import { keys } from '@/shared/constants/keys'
import { urls } from '@/shared/constants/urls'
import http from '@/shared/utils/http'
import { IApi } from '@/shared/types'
import { Item } from '../types'

export const useStatusChart = () => {
	return useQuery({
		queryKey: [keys.itemStatusChart],
		queryFn: async (): Promise<
			IApi<{ name: string; total: number; fill: string }[]>
		> => {
			const { data } = await http(`${urls.item}/data/status`)
			return data
		},
	})
}

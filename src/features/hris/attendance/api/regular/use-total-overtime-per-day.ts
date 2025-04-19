import { useQuery } from '@tanstack/react-query'

import { IApi } from '@/shared/types'

import { keys } from '@/shared/constants/keys'
import { urls } from '@/shared/constants/urls'
import http from '@/shared/utils/http'

type Params = {
	startDate?: string
}

export const useTotalOvertimePerDay = (params?: Params) => {
	return useQuery({
		queryKey: [keys.overtimeTotalPerDay, params],
		queryFn: async (): Promise<IApi<{ total: number }>> => {
			const { data } = await http(urls.overtime + '/data/total-per-day', {
				params,
			})
			return data
		},
	})
}

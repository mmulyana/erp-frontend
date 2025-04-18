import { useQuery } from '@tanstack/react-query'

import { IApi } from '@/shared/types'

import { keys } from '@/shared/constants/keys'
import { urls } from '@/shared/constants/urls'
import http from '@/shared/utils/http'

import { TotalInMonth } from '../types'

type Params = {
	startDate: string
}

export const useTotalInMonth = (params: Params) => {
	return useQuery({
		queryKey: [keys.cashAdvancesReport, 'month'],
		queryFn: async (): Promise<IApi<TotalInMonth>> => {
			const { data } = await http(`${urls.cashAdvances}/report/month`, {
				params,
			})
			return data
		},
	})
}

import { useQuery } from '@tanstack/react-query'

import { IApi } from '@/shared/types'

import { keys } from '@/shared/constants/keys'
import { urls } from '@/shared/constants/urls'
import http from '@/shared/utils/http'

import { TotalInDay } from '../types'

type Params = {
	startDate: string
}

export const useTotalInDay = (params: Params) => {
	return useQuery({
		queryKey: [keys.cashAdvancesReport, 'day'],
		queryFn: async (): Promise<IApi<TotalInDay>> => {
			const { data } = await http(`${urls.cashAdvances}/report/day`, {
				params,
			})
			return data
		},
	})
}

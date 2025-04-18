import { useQuery } from '@tanstack/react-query'

import { IApi } from '@/shared/types'

import { keys } from '@/shared/constants/keys'
import { urls } from '@/shared/constants/urls'
import http from '@/shared/utils/http'

import { TotalInYear } from '../types'

type Params = {
	startDate: string
}

export const useTotalInYear = (params: Params) => {
	return useQuery({
		queryKey: [keys.cashAdvancesReport, 'year'],
		queryFn: async (): Promise<IApi<TotalInYear>> => {
			const { data } = await http(`${urls.cashAdvances}/report/year`, {
				params,
			})
			return data
		},
	})
}

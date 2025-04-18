import { useQuery } from '@tanstack/react-query'

import { IApi } from '@/shared/types'

import { keys } from '@/shared/constants/keys'
import { urls } from '@/shared/constants/urls'
import http from '@/shared/utils/http'

import { ReportLastSixMonth } from '../types'

type Params = {
	startDate: string
}

export const useReportLastSixMonths = (params: Params) => {
	return useQuery({
		queryKey: [keys.cashAdvancesReport, 'six-month'],
		queryFn: async (): Promise<IApi<ReportLastSixMonth>> => {
			const { data } = await http(`${urls.cashAdvances}/report/six-month`, {
				params,
			})
			return data
		},
	})
}

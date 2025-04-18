import { useQuery } from '@tanstack/react-query'

import { IApi } from '@/shared/types'

import { keys } from '@/shared/constants/keys'
import { urls } from '@/shared/constants/urls'
import http from '@/shared/utils/http'

import { ReportTop } from '../types'

type Params = {
	startDate: string
}

export const useReportTopByEmployee = (params: Params) => {
	return useQuery({
		queryKey: [keys.cashAdvancesReport, 'top', params],
		queryFn: async (): Promise<IApi<ReportTop[]>> => {
			const { data } = await http(`${urls.cashAdvances}/report/top-5`, {
				params,
			})
			return data
		},
	})
}

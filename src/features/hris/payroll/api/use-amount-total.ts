import { useQuery } from '@tanstack/react-query'

import { keys } from '@/shared/constants/keys'
import { urls } from '@/shared/constants/urls'
import http from '@/shared/utils/http'

type Params = {
	month?: string
	periodId?: string
}

export const useAmountTotal = (params?: Params) => {
	return useQuery({
		queryKey: [keys.payrollTotal, params?.month, params?.periodId],
		queryFn: async (): Promise<{ total: number; percentage?: number }> => {
			const { data } = await http(urls.payroll + '/report/total', {
				params,
			})
			return data.data
		},
		enabled:
			(params?.month !== undefined &&
				params?.month !== null &&
				params?.month !== '') ||
			(params?.periodId !== undefined &&
				params?.periodId !== null &&
				params?.periodId !== ''),
	})
}

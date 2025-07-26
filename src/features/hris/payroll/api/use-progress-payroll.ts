import { useQuery } from '@tanstack/react-query'

import { keys } from '@/shared/constants/keys'
import { urls } from '@/shared/constants/urls'
import http from '@/shared/utils/http'

type Params = {
	periodId?: string
}

export const useProgressPayroll = (params?: Params) => {
	return useQuery({
		queryKey: [keys.payrollTotal, params?.periodId],
		queryFn: async (): Promise<{
			data: { name: string; total: number; fill: string }[]
		}> => {
			const { data } = await http(
				`${urls.payroll}/report/progress/${params?.periodId}`,
				{
					params,
				}
			)
			return data.data
		},
		enabled:
			params?.periodId !== undefined &&
			params?.periodId !== null &&
			params?.periodId !== '',
	})
}

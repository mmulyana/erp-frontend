import { useQuery } from '@tanstack/react-query'

import { IApi, IApiPagination } from '@/shared/types'
import { keys } from '@/shared/constants/keys'
import { urls } from '@/shared/constants/urls'
import http from '@/shared/utils/http'

type params = {
	id?: string
}
export const useDataChartCashAdvance = (params?: params) => {
	return useQuery({
		queryKey: [keys.employeeData, 'chart-cash-advance', params?.id],
		queryFn: async (): Promise<
			IApi<{ id: string; amount: number; note?: string; date: string }[]>
		> => {
			const { data } = await http(
				`${urls.employee}/${params?.id}/data/cash-advance/chart`
			)
			return data
		},
		enabled:
			params?.id !== null && params?.id !== undefined && params?.id !== '',
	})
}

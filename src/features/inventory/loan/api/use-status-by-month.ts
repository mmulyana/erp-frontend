import { useQuery } from '@tanstack/react-query'

import { keys } from '@/shared/constants/keys'
import { urls } from '@/shared/constants/urls'
import { IApi } from '@/shared/types'
import http from '@/shared/utils/http'

export const useStatusByMonth = (params: { month?: string }) => {
	return useQuery({
		queryKey: [keys.stockLoanStatus, params],
		queryFn: async (): Promise<
			IApi<{ name: string; total: number; fill: string }[]>
		> => {
			const { data } = await http(`${urls.loan}/data/status`, {
				params,
			})
			return data
		},
	})
}

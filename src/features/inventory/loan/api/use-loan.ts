import { useQuery } from '@tanstack/react-query'

import { keys } from '@/shared/constants/keys'
import { urls } from '@/shared/constants/urls'
import { Loan } from '@/shared/types/api'
import { IApi } from '@/shared/types'
import http from '@/shared/utils/http'

export const useLoan = (params?: { id?: string }) => {
	return useQuery({
		queryKey: [keys.stockLoanDetail, params?.id],
		queryFn: async (): Promise<IApi<Loan>> => {
			const { data } = await http(`${urls.loan}/${params?.id}`, {
				params,
			})
			return data
		},
		enabled:
			params?.id !== null && params?.id !== undefined && params.id !== '',
	})
}

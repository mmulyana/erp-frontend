import { useQuery } from '@tanstack/react-query'

import { IApiPagination, Pagination } from '@/shared/types'
import { keys } from '@/shared/constants/keys'
import { urls } from '@/shared/constants/urls'
import http from '@/shared/utils/http'
import { Loan } from '@/shared/types/api'

export const useLoans = (
	params?: Pagination & {
		projectId?: string
		status?: string
		inventoryId?: string
		borrowerId?: string
	}
) => {
	return useQuery({
		queryKey: [keys.stockLoan, params],
		queryFn: async (): Promise<IApiPagination<Loan[]>> => {
			const { data } = await http(urls.loan, {
				params,
			})
			return data
		},
	})
}

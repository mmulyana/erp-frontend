import { useQuery } from '@tanstack/react-query'

import { IApiPagination, Pagination } from '@/shared/types'

import { keys } from '@/shared/constants/keys'
import { urls } from '@/shared/constants/urls'
import http from '@/shared/utils/http'

import { CashAdvance } from '../types'

export const useCashAdvances = (
	params?: Pagination & {
		position?: string
	}
) => {
	return useQuery({
		queryKey: [keys.cashAdvances, params],
		queryFn: async (): Promise<IApiPagination<CashAdvance[]>> => {
			const { data } = await http(urls.cashAdvances, {
				params,
			})
			return data
		},
	})
}

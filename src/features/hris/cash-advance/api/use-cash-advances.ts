import { useQuery } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'

import { IApiPagination } from '@/shared/types'

import { keys } from '@/shared/constants/_keys'
import { urls } from '@/shared/constants/_urls'
import http from '@/shared/utils/http'

import { CashAdvance } from '../types'

type Params = {
	search?: string
	page?: string
	limit?: string
}

export const useCashAdvances = (params?: Params) => {
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

import { useQuery } from '@tanstack/react-query'

import { IApiPagination } from '@/shared/types'

import { keys } from '@/shared/constants/keys'
import { urls } from '@/shared/constants/urls'
import http from '@/shared/utils/http'
import { Payroll } from '@/shared/types/api'

type Params = {
	search?: string
	page?: string
	limit?: string
	periodId?: string
	status?: string
	enabled?: boolean
}

export const usePayrolls = (params?: Params) => {
	return useQuery({
		queryKey: [keys.payroll, params],
		queryFn: async (): Promise<IApiPagination<Payroll[]>> => {
			const { data } = await http(urls.payroll, {
				params,
			})
			return data
		},
		enabled: params?.enabled,
	})
}

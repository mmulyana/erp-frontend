import { useQuery } from '@tanstack/react-query'

import { IApiPagination, Pagination } from '@/shared/types'

import { keys } from '@/shared/constants/keys'
import { urls } from '@/shared/constants/urls'
import { Payroll } from '@/shared/types/api'
import http from '@/shared/utils/http'

type Params = Pagination & {
	periodId?: string
	status?: string
	enabled?: boolean
	sortBy?: string
	sortOrder?: string
}

export const usePayrolls = (params?: Params) => {
	return useQuery({
		queryKey: [keys.payroll, params?.periodId, params],
		queryFn: async (): Promise<IApiPagination<Payroll[]>> => {
			const { data } = await http(urls.payroll, {
				params,
			})
			return data
		},
		enabled: params?.enabled,
	})
}

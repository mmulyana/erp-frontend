import { useQuery } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'

import { IApiPagination } from '@/shared/types'

import { keys } from '@/utils/constant/_keys'
import { urls } from '@/utils/constant/_urls'
import http from '@/utils/http'

import { Employee } from '../types'

type ParamsEmployee = {
	search?: string
	name?: string
	enabled?: boolean
}
export const useEmployees = (params?: ParamsEmployee) => {
	return useQuery({
		queryKey: [keys.employee, params],
		queryFn: async (): Promise<AxiosResponse<IApiPagination<Employee[]>>> => {
			return await http(urls.employee, {
				params,
			})
		},
	})
}

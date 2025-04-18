import { useQuery } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'

import { Employee, IApiPagination } from '@/shared/types'

import { keys } from '@/shared/constants/keys'
import { urls } from '@/shared/constants/urls'
import http from '@/shared/utils/http'

type ParamsEmployee = {
	search?: string
	name?: string
	page?: string
	limit?: string
}
export const useEmployees = (params?: ParamsEmployee) => {
	return useQuery({
		queryKey: [keys.employee, params],
		queryFn: async (): Promise<IApiPagination<Employee[]>> => {
			const { data } = await http(urls.employee, {
				params,
			})
			return data
		},
	})
}

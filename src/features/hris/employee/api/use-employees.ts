import { useQuery } from '@tanstack/react-query'

import { Employee, IApiPagination, Pagination } from '@/shared/types'
import { keys } from '@/shared/constants/keys'
import { urls } from '@/shared/constants/urls'
import http from '@/shared/utils/http'

export const useEmployees = (
	params?: Pagination & {
		sortBy?: string
		sortOrder?: string
		active?: string
		lastEdu?: string
		position?: string
	}
) => {
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

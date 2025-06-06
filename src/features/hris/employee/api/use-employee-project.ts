import { useQuery } from '@tanstack/react-query'

import { IApiPagination, Pagination } from '@/shared/types'
import { AssignedEmployee } from '@/shared/types/api'
import { keys } from '@/shared/constants/keys'
import { urls } from '@/shared/constants/urls'
import http from '@/shared/utils/http'

export const useEmployeeProject = (
	params?: Pagination & {
		employeeId?: string
	}
) => {
	return useQuery({
		queryKey: [keys.employeeProject, params],
		queryFn: async (): Promise<IApiPagination<AssignedEmployee[]>> => {
			const { data } = await http(`${urls.employee}/data/project`, {
				params,
			})
			return data
		},
	})
}

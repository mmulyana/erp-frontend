import { useQuery } from '@tanstack/react-query'

import { IApiPagination, Pagination } from '@/shared/types'
import { AssignedEmployee } from '@/shared/types/api'
import { keys } from '@/shared/constants/keys'
import { urls } from '@/shared/constants/urls'
import http from '@/shared/utils/http'

export const useEmployeeProject = (
	params?: Pagination & {
		employeeId?: string
		isEnd?: boolean
		enabled?: boolean
	}
) => {
	const { enabled, ...resParams } = params
	return useQuery({
		queryKey: [keys.employeeProject, resParams],
		queryFn: async (): Promise<IApiPagination<AssignedEmployee[]>> => {
			const { data } = await http(`${urls.employee}/data/project`, {
				params,
			})
			return data
		},
		enabled: enabled,
	})
}

import { useQuery } from '@tanstack/react-query'

import { IApiPagination, Pagination } from '@/shared/types'
import { keys } from '@/shared/constants/keys'
import { urls } from '@/shared/constants/urls'
import { Project } from '@/shared/types/api'
import http from '@/shared/utils/http'

export const useProjects = (
	params?: Pagination & {
		leadId?: string
		clientId?: string
		status?: string
		sortBy?: string
		sortOrder?: string
		priority?: string
	}
) => {
	return useQuery({
		queryKey: [keys.project, params],
		queryFn: async (): Promise<IApiPagination<Project[]>> => {
			const { data } = await http(urls.project, {
				params,
			})
			return data
		},
	})
}

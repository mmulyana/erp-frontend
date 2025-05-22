import { useQuery } from '@tanstack/react-query'

import { IApiPagination } from '@/shared/types'
import { keys } from '@/shared/constants/keys'
import { urls } from '@/shared/constants/urls'
import { Project } from '@/shared/types/api'
import http from '@/shared/utils/http'

type Params = {
	search?: string
	page?: string
	limit?: string
}

export const useProjects = (params?: Params) => {
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

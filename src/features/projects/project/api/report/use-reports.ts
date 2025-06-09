import { useQuery } from '@tanstack/react-query'

import { IApiPagination, Pagination } from '@/shared/types'
import { ProjectReport } from '@/shared/types/api'
import { keys } from '@/shared/constants/keys'
import { urls } from '@/shared/constants/urls'
import http from '@/shared/utils/http'

type Params = Pagination & {
	projectId?: string
	type?: string
	createdBy?: string
	infinite?: boolean
}

export const useReports = (params?: Params) => {
	return useQuery({
		queryKey: [keys.projectReport, params],
		queryFn: async (): Promise<IApiPagination<ProjectReport[]>> => {
			const { data } = await http(`${urls.project}/data/report`, {
				params,
			})
			return data
		},
	})
}

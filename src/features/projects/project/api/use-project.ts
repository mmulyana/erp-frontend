import { useQuery } from '@tanstack/react-query'

import { keys } from '@/shared/constants/keys'
import { urls } from '@/shared/constants/urls'
import { Project } from '@/shared/types/api'
import { IApi } from '@/shared/types'
import http from '@/shared/utils/http'

type Params = {
	id?: string
}

export const useProject = (params?: Params) => {
	return useQuery({
		queryKey: [keys.projectDetail, params?.id],
		queryFn: async (): Promise<IApi<Project>> => {
			const { data } = await http.get<IApi<Project>>(
				`${urls.project}/${params?.id}`
			)
			return data
		},
		enabled:
			params?.id !== null && params?.id !== undefined && params?.id !== '',
	})
}

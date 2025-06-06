import { useQuery } from '@tanstack/react-query'

import { keys } from '@/shared/constants/keys'
import { urls } from '@/shared/constants/urls'
import { ProjectReport } from '@/shared/types/api'
import { IApi } from '@/shared/types'
import http from '@/shared/utils/http'

type Params = {
	id?: string
  enabled?: boolean
}

export const useReport = (params?: Params) => {
	return useQuery({
		queryKey: [keys.reportDetail, params?.id],
		queryFn: async (): Promise<IApi<ProjectReport>> => {
			const { data } = await http(`${urls.project}/report/${params?.id}`, {
				params,
			})
			return data
		},
		enabled:
			params?.id !== null && params?.id !== undefined && params?.id !== '',
	})
}

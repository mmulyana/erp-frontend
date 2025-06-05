import { useQuery } from '@tanstack/react-query'

import { keys } from '@/shared/constants/keys'
import { urls } from '@/shared/constants/urls'
import http from '@/shared/utils/http'
import { IApi } from '@/shared/types'

import { ProjectEmployee } from '../../types'

type Params = {
	id?: string
}

export const useProjectEmployees = (params?: Params) => {
	return useQuery({
		queryKey: [keys.projectEmployee, params?.id],
		queryFn: async (): Promise<IApi<ProjectEmployee[]>> => {
			const { data } = await http(`${urls.project}/${params?.id}/employee`, {
				params,
			})
			return data
		},
		enabled:
			params?.id !== null && params?.id !== undefined && params?.id !== '',
	})
}

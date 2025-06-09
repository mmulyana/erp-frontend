import { useQuery } from '@tanstack/react-query'

import { keys } from '@/shared/constants/keys'
import { urls } from '@/shared/constants/urls'
import http from '@/shared/utils/http'
import { IApi } from '@/shared/types'

import { ProjectEmployee } from '../../types'
import { AssignedEmployee } from '@/shared/types/api'

type Params = {
	id?: string
}

export const useProjectEmployee = (params?: Params) => {
	return useQuery({
		queryKey: [keys.projectEmployeeDetail, params?.id],
		queryFn: async (): Promise<IApi<AssignedEmployee>> => {
			const { data } = await http(
				`${urls.project}/data/assigned/${params?.id}`,
				{
					params,
				}
			)
			return data
		},
		enabled:
			params?.id !== null && params?.id !== undefined && params?.id !== '',
	})
}

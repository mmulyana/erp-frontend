import { useQuery } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'

import { DashboardTotal, IApi } from '@/utils/types/api'
import { keys } from '@/utils/constant/_keys'
import { urls } from '@/utils/constant/_urls'
import http from '@/utils/http'

export const useDashboardTotal = () => {
	return useQuery({
		queryKey: [keys.dashboard],
		queryFn: async (): Promise<AxiosResponse<IApi<DashboardTotal>>> => {
			return await http(urls.dashboard + '/total')
		},
	})
}

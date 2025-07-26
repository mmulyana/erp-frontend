import { useQuery } from '@tanstack/react-query'

import { IApi } from '@/shared/types'
import { keys } from '@/shared/constants/keys'
import { urls } from '@/shared/constants/urls'
import http from '@/shared/utils/http'

export const useTotalEmployee = () => {
	return useQuery({
		queryKey: [keys.employeeReportData],
		queryFn: async (): Promise<
			IApi<
				{
					name: string
					total: number
					fill: string
				}[]
			>
		> => {
			const { data } = await http(urls.employee + '/data/chart')
			return data
		},
	})
}

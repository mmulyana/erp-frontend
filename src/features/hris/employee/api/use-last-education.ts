import { useQuery } from '@tanstack/react-query'

import { keys } from '@/shared/constants/keys'
import { urls } from '@/shared/constants/urls'
import { IApi } from '@/shared/types'

import http from '@/shared/utils/http'

export const useLastEducation = () => {
	return useQuery({
		queryKey: [keys.employeeReportLastEducation],
		queryFn: async (): Promise<
			IApi<
				{
					name: string
					total: number
					fill: string
				}[]
			>
		> => {
			const { data } = await http(urls.employee + '/data/last-education')
			return data
		},
	})
}

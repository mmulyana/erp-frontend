import { useQuery } from '@tanstack/react-query'

import { keys } from '@/shared/constants/keys'
import { urls } from '@/shared/constants/urls'
import http from '@/shared/utils/http'
import { IApi } from '@/shared/types'

type params = {
	startDate?: string
	endDate?: string
	id?: string
}
export const useDataRegular = (params?: params) => {
	return useQuery({
		queryKey: [
			keys.employeeData,
			'attendance',
			params?.id,
			params?.startDate,
			params?.endDate,
		],
		queryFn: async (): Promise<
			IApi<{
				data: { presence: number[] }[]
				total: {
					presence: number
					absent: number
					notYet: number
				}
			}>
		> => {
			const { data } = await http(
				`${urls.employee}/${params?.id}/data/attendance`,
				{
					params: {
						startDate: params?.startDate,
						endDate: params?.endDate,
					},
				}
			)
			return data
		},
		enabled:
			params?.id !== null && params?.id !== undefined && params?.id !== '',
	})
}

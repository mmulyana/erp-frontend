import { useQuery } from '@tanstack/react-query'

import { keys } from '@/shared/constants/keys'
import { urls } from '@/shared/constants/urls'
import http from '@/shared/utils/http'
import { IApi } from '@/shared/types'

type params = {
	startMonth?: string
	endMonth?: string
	year?: string
	id?: string
}
export const useDataRegular = (params?: params) => {
	return useQuery({
		queryKey: [
			keys.employeeData,
			'attendance',
			params?.id,
			params?.startMonth,
			params?.endMonth,
			params?.year,
		],
		queryFn: async (): Promise<
			IApi<{
				data: { presence: number[]; absent: number[]; month: number }[]
			}>
		> => {
			const { data } = await http(
				`${urls.employee}/${params?.id}/data/attendance`,
				{
					params: {
						startMonth: params?.startMonth,
						endMonth: params?.endMonth,
						year: params?.year,
					},
				}
			)
			return data
		},
		enabled:
			params?.id !== null &&
			params?.id !== undefined &&
			params?.id !== '' &&
			params?.startMonth !== null &&
			params?.startMonth !== undefined &&
			params?.startMonth !== '' &&
			params?.endMonth !== null &&
			params?.endMonth !== undefined &&
			params?.endMonth !== '' &&
			params?.year !== null &&
			params?.year !== undefined &&
			params?.year !== '',
	})
}

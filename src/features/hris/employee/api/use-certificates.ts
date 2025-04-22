import { useQuery } from '@tanstack/react-query'

import { Employee, IApiPagination } from '@/shared/types'
import { keys } from '@/shared/constants/keys'
import { urls } from '@/shared/constants/urls'
import http from '@/shared/utils/http'
import { Certificate } from '../types'

type params = {
	search?: string
	page?: string
	limit?: string
	id?: string
}
export const useCertificates = (params?: params) => {
	return useQuery({
		queryKey: [keys.employeeCertificates, params?.id, params],
		queryFn: async (): Promise<IApiPagination<Certificate[]>> => {
			const { data } = await http(
				`${urls.employee}/${params?.id}/certificate`,
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

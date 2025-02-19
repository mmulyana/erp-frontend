import { KEYS } from '@/utils/constant/_keys'
import { URLS } from '@/utils/constant/_urls'
import http from '@/utils/http'
import { IApiPagination, User } from '@/utils/types/api'
import { Pagination } from '@/utils/types/common'
import { useQuery } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'

export const useUsers = (
	params?: {
		search?: string
		roleId?: string
	} & Pagination
) => {
	return useQuery({
		queryKey: [KEYS.USER, params?.search, params?.page, params?.limit],
		queryFn: async (): Promise<AxiosResponse<IApiPagination<User[]>>> => {
			return await http(URLS.USER, { params })
		},
	})
}

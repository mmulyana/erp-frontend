import { keys } from '@/shared/constants/_keys'
import { urls } from '@/shared/constants/_urls'
import http from '@/shared/utils/http'
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
		queryKey: [keys.user, params?.search, params?.page, params?.limit],
		queryFn: async (): Promise<AxiosResponse<IApiPagination<User[]>>> => {
			return await http(urls.user, { params })
		},
	})
}

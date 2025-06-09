import { useQuery } from '@tanstack/react-query'

import { IApiPagination, Pagination } from '@/shared/types'

import { keys } from '@/shared/constants/keys'
import { urls } from '@/shared/constants/urls'
import http from '@/shared/utils/http'

import { Attendance } from '../../types'

export const useAttendances = (
	params?: Pagination & {
		notYet?: string
		position?: string
		startDate?: string
	}
) => {
	return useQuery({
		queryKey: [keys.attendance, params],
		queryFn: async (): Promise<IApiPagination<Attendance[]>> => {
			const { data } = await http(urls.attendance, {
				params,
			})
			return data
		},
	})
}

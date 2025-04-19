import { useQuery } from '@tanstack/react-query'

import { IApi } from '@/shared/types'

import { keys } from '@/shared/constants/keys'
import { urls } from '@/shared/constants/urls'
import http from '@/shared/utils/http'

import { TotalAttendancePerDay } from '../../types'

type Params = {
	startDate?: string
}

export const useTotalAttendancePerDay = (params?: Params) => {
	return useQuery({
		queryKey: [keys.attendanceTotalPerDay, params],
		queryFn: async (): Promise<IApi<TotalAttendancePerDay>> => {
			const { data } = await http(urls.attendance + '/total-per-day', {
				params,
			})
			return data
		},
	})
}

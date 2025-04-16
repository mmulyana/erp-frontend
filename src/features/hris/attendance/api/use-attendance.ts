import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'

import { IApi, Pagination } from '@/shared/types'
import { keys } from '@/shared/constants/_keys'
import { urls } from '@/shared/constants/_urls'
import http from '@/shared/utils/http'

type AttendanceParams = Pagination & {
	name?: string
	date?: string
	endDate?: string
}
export const useAttendances = (params?: AttendanceParams) => {
	return useQuery({
		queryKey: [keys.attendance, params?.date, params?.endDate, params?.name],
		queryFn: async (): Promise<AxiosResponse<IApi<any[]>>> => {
			return await http(urls.attendance, {
				params,
			})
		},
	})
}

type createAttendance = {
	employeeId: number
	date: string | any
	total_hour: number
	type: 'presence' | 'absent'
	leaveId?: number
}
export const useCreateAttendance = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async (payload: createAttendance) => {
			return await http.post(urls.attendance, payload)
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [keys.attendance] })
		},
	})
}

export const useUpdateAttendance = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async ({
			id,
			payload,
		}: {
			id: number
			payload: Partial<createAttendance>
		}) => {
			return await http.patch(`${urls.attendance}/${id}`, payload)
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [keys.attendance] })
		},
	})
}

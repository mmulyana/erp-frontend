import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'
import { toast } from 'sonner'

import { urls } from '@/shared/constants/urls'
import { keys } from '@/shared/constants/keys'
import { IApi } from '@/shared/types'

import http from '@/shared/utils/http'

export const useUpdateAttendance = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async (payload: {
			employeeId: string
			date: string
			type: 'presence' | 'absent'
		}): Promise<AxiosResponse<IApi<any>>> => {
			return await http.patch(urls.attendance, payload)
		},
		onSuccess: (data) => {
			queryClient.invalidateQueries({ queryKey: [keys.attendance] })
			queryClient.invalidateQueries({ queryKey: [keys.attendanceTotalPerDay] })
			queryClient.invalidateQueries({ queryKey: [keys.attendanceByDate] })
			toast.success(data.data.message)
		},
		onError: (error: AxiosError<any>) => {
			toast.error(error.response?.data.message)
		},
	})
}

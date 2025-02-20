import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'
import { toast } from 'sonner'

import { keys } from '@/utils/constant/_keys'
import { urls } from '@/utils/constant/_urls'
import { IApi } from '@/utils/types/api'
import http from '@/utils/http'

export const useStatusEmployee = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async ({
			id,
			status,
			description,
		}: {
			id: number
			status: boolean
			description?: string
		}): Promise<AxiosResponse<IApi<{ employeeId: number }>>> => {
			if (status) {
				return await http.patch(`${urls.employee}/status/inactive/${id}`, {
					description,
				})
			} else {
				return await http.patch(`${urls.employee}/status/active/${id}`, {
					description,
				})
			}
		},
		onSuccess: (data) => {
			queryClient.invalidateQueries({
				queryKey: [keys.employeeStatus],
			})
			queryClient.invalidateQueries({
				queryKey: [keys.employee],
			})
			queryClient.invalidateQueries({
				queryKey: [keys.employeeDetail, data.data.data?.employeeId],
			})
			toast.success(data.data.message)
		},
	})
}

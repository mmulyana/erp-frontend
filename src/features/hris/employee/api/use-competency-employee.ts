import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'
import { toast } from 'sonner'

import { keys } from '@/utils/constant/_keys'
import { urls } from '@/utils/constant/_urls'
import { IApi } from '@/utils/types/api'
import http from '@/utils/http'

export const useAddCompetency = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async ({
			id,
			payload,
		}: {
			id: number
			payload: { competencyId: number }
		}): Promise<AxiosResponse<IApi<{ employeeId: number }>>> => {
			return await http.post(
				`${urls.employee}/competency/single/${id}`,
				payload
			)
		},
		onSuccess: (data) => {
			queryClient.invalidateQueries({
				queryKey: [keys.employee],
			})
			queryClient.invalidateQueries({
				queryKey: [keys.employee, data.data.data?.employeeId],
			})
			toast.success(data.data.message)
		},
	})
}

export const useRemoveCompetency = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async ({
			id,
		}: {
			id: number
		}): Promise<AxiosResponse<IApi<{ employeeId: number }>>> => {
			return await http.delete(`${urls.employee}/competency/${id}`)
		},
		onSuccess: (data) => {
			queryClient.invalidateQueries({
				queryKey: [keys.employee],
			})
			queryClient.invalidateQueries({
				queryKey: [keys.employee, data.data.data?.employeeId],
			})
			toast.success(data.data.message)
		},
	})
}

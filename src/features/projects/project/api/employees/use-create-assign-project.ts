import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toast } from 'sonner'

import { urls } from '@/shared/constants/urls'
import { keys } from '@/shared/constants/keys'
import http from '@/shared/utils/http'

export const useCreateAssignProject = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async (payload: {
			projectId: string
			employeeId: string
			startDate?: string
			endDate?: string
		}) => {
			const res = await http.post(urls.project + '/assign/employee', payload)
			return {
				res,
				projectId: payload.projectId,
			}
		},
		onSuccess: (data) => {
			queryClient.invalidateQueries({
				queryKey: [keys.projectEmployee, data.projectId],
			})
			toast.success(data?.res?.data?.message)
		},
		onError: (error: AxiosError<any>) => {
			toast.error(error.response?.data.message)
		},
	})
}

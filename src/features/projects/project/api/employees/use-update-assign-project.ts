import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toast } from 'sonner'

import { urls } from '@/shared/constants/urls'
import { keys } from '@/shared/constants/keys'
import http from '@/shared/utils/http'

export const useUpdateAssignProject = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async (payload: {
			startDate?: string
			endDate?: string
			id: string
		}) => {
			const res = await http.patch(
				`${urls.project}/assign/employee/${payload.id}`,
				payload
			)
			return res
		},
		onSuccess: (data) => {
			queryClient.invalidateQueries({
				queryKey: [keys.projectEmployee, data.data.data.projectId],
			})
			toast.success(data?.data?.message)
		},
		onError: (error: AxiosError<any>) => {
			toast.error(error.response?.data.message)
		},
	})
}

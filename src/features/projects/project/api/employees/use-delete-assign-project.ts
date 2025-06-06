import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toast } from 'sonner'

import { urls } from '@/shared/constants/urls'
import http from '@/shared/utils/http'

export const useDeleteAssignProject = () => {
	return useMutation({
		mutationFn: async (payload: { id: string }) => {
			const res = await http.delete(
				`${urls.project}/assign/employee/${payload.id}`
			)
			return res
		},
		onSuccess: (data) => {
			toast.success(data?.data?.message)
		},
		onError: (error: AxiosError<any>) => {
			toast.error(error.response?.data.message)
		},
	})
}

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toast } from 'sonner'

import { keys } from '@/shared/utils/constant/_keys'
import { urls } from '@/shared/utils/constant/_urls'
import { ApiError } from '@/utils/types/api'
import http from '@/shared/utils/http'

export const useDeleteRole = () => {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: async ({ id }: { id: string }) => {
			return await http.delete(`${urls.role}/${id}`)
		},
		onSuccess: (data) => {
			queryClient.invalidateQueries({ queryKey: [keys.roles] })
			toast.success(data.data.message)
		},
		onError: (err: AxiosError<ApiError>) => {
			toast.error(err.response?.data.message)
		},
	})
}

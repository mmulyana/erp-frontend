import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toast } from 'sonner'

import { keys } from '@/shared/utils/constant/_keys'
import { urls } from '@/shared/utils/constant/_urls'
import { ApiError } from '@/utils/types/api'
import http from '@/shared/utils/http'

export const useCreateTour = () => {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: async ({ id, key }: { id: string; key: string }) => {
			return await http.post(`${urls.user}/${id}/tour`, { key })
		},
		onSuccess(data) {
			toast.success(data.data.message)
			queryClient.invalidateQueries({
				queryKey: [keys.me],
			})
		},
		onError: (error: AxiosError<ApiError>) => {
			toast.error(error.response?.data.message)
		},
	})
}

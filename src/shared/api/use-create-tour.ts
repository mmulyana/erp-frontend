import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toast } from 'sonner'

import { KEYS } from '@/utils/constant/_keys'
import { URLS } from '@/utils/constant/_urls'
import { ApiError } from '@/utils/types/api'
import http from '@/utils/http'

export const useCreateTour = () => {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: async ({ id, key }: { id: string; key: string }) => {
			return await http.post(`${URLS.ACCOUNT}/${id}/tour`, { key })
		},
		onSuccess(data) {
			toast.success(data.data.message)
			queryClient.invalidateQueries({
				queryKey: [KEYS.ACCOUNT],
			})
		},
		onError: (error: AxiosError<ApiError>) => {
			toast.error(error.response?.data.message)
		},
	})
}

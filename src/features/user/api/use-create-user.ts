import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toast } from 'sonner'

import { keys } from '@/shared/utils/constant/_keys'
import { urls } from '@/shared/utils/constant/_urls'
import { ApiError } from '@/utils/types/api'
import http from '@/shared/utils/http'
import { CreateUser } from '../types'

export const useCreateUser = () => {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: async (payload: CreateUser) => {
			return await http.post(urls.user, payload)
		},
		onSuccess(data) {
			toast.success(data.data.message)
			queryClient.invalidateQueries({
				queryKey: [keys.user],
			})
		},
		onError: (error: AxiosError<ApiError>) => {
			toast.error(error.response?.data.message)
		},
	})
}

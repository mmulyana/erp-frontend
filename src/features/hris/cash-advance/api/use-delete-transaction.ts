import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'
import { toast } from 'sonner'

import { urls } from '@/shared/constants/urls'
import { IApi } from '@/shared/types'
import http from '@/shared/utils/http'

export const useDeleteTransaction = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async (payload: {
			id: string
		}): Promise<AxiosResponse<IApi<any>>> => {
			return await http.delete(`${urls.cashAdvances}/transaction/${payload.id}`)
		},
		onSuccess: (data) => {
			toast.success(data.data.message)
		},
		onError: (error: AxiosError<any>) => {
			toast.error(error.response?.data.message)
		},
	})
}

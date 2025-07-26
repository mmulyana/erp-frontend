import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'
import { toast } from 'sonner'

import { urls } from '@/shared/constants/urls'
import { keys } from '@/shared/constants/keys'
import http from '@/shared/utils/http'
import { IApi } from '@/shared/types'

export const useCreateTransaction = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async (
			payload: Partial<any>
		): Promise<AxiosResponse<IApi<any>>> => {
			return await http.post(urls.cashAdvances + '/transaction', payload)
		},
		onSuccess: (data) => {
			queryClient.invalidateQueries({
				queryKey: [keys.cashAdvanceTransactions],
			})
			toast.success(data.data.message)
		},
		onError: (error: AxiosError<any>) => {
			toast.error(error.response?.data.message)
		},
	})
}

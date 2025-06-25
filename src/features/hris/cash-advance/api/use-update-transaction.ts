import { useMutation } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'
import { toast } from 'sonner'

import { urls } from '@/shared/constants/urls'
import { IApi } from '@/shared/types'
import http from '@/shared/utils/http'
import { TransactionMutate } from '../types'

export const useUpdateTransaction = () => {
	return useMutation({
		mutationFn: async (
			payload: TransactionMutate & { id: string }
		): Promise<AxiosResponse<IApi<any>>> => {
			return await http.patch(
				`${urls.cashAdvances}/transaction/${payload.id}`,
				payload
			)
		},
		onSuccess: (data) => {
			toast.success(data.data.message)
		},
		onError: (error: AxiosError<any>) => {
			toast.error(error.response?.data.message)
		},
	})
}

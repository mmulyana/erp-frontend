import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'
import { toast } from 'sonner'

import { urls } from '@/shared/constants/_urls'
import { keys } from '@/shared/constants/_keys'
import { Employee, IApi } from '@/shared/types'
import http from '@/shared/utils/http'

import { CashAdvanceForm } from '../schemas'

export const useCreateCashAdvance = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async (
			payload: Partial<CashAdvanceForm>
		): Promise<AxiosResponse<IApi<CashAdvanceForm>>> => {
			return await http.post(urls.cashAdvances, payload)
		},
		onSuccess: (data) => {
			queryClient.invalidateQueries({ queryKey: [keys.cashAdvances] })
			toast.success(data.data.message)
		},
		onError: (error: AxiosError<any>) => {
			toast.error(error.response?.data.message)
		},
	})
}

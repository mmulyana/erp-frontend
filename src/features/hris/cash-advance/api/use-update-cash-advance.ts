import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toast } from 'sonner'

import { urls } from '@/shared/constants/_urls'
import { keys } from '@/shared/constants/_keys'
import http from '@/shared/utils/http'

import { CashAdvanceForm } from '../types'

export const useUpdateCashAdvance = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async (payload: Partial<CashAdvanceForm> & { id: string }) => {
			const res = await http.patch(
				`${urls.cashAdvances}/${payload.id}`,
				payload
			)
			return {
				res,
				id: payload.id,
			}
		},
		onSuccess: (data) => {
			queryClient.invalidateQueries({ queryKey: [keys.cashAdvances] })
			queryClient.invalidateQueries({ queryKey: [keys.cashAdvances, data.id] })
			toast.success(data.res.data.message)
		},
		onError: (error: AxiosError<any>) => {
			toast.error(error.response?.data.message)
		},
	})
}

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError, toFormData } from 'axios'
import { toast } from 'sonner'

import { urls } from '@/shared/constants/urls'
import { keys } from '@/shared/constants/keys'
import { Loan } from '@/shared/types/api'
import { IApi } from '@/shared/types'
import http from '@/shared/utils/http'

import { returnForm } from '../types'

export function useReturnLoan() {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async (payload: returnForm & { id: string }) => {
			const formData = toFormData(payload)

			return await http.patch<IApi<Loan>>(
				`${urls.loan}/${payload.id}/return`,
				formData,
				{
					headers: {
						'Content-Type': 'multipart/form-data',
					},
				}
			)
		},
		onSuccess: (data) => {
			queryClient.invalidateQueries({ queryKey: [keys.stockLoan] })
			queryClient.invalidateQueries({
				queryKey: [keys.stockLoanDetail, data.data.data?.id],
			})
			toast.success(data.data.message)
		},
		onError: (error: AxiosError<any>) => {
			toast.error(error.response?.data.message)
		},
	})
}

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toast } from 'sonner'

import { urls } from '@/shared/constants/urls'
import { keys } from '@/shared/constants/keys'
import http from '@/shared/utils/http'
import { loanForm } from '../types'
import { IApi } from '@/shared/types'
import { Loan } from '@/shared/types/api'

export function useUpdateLoan() {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async (payload: loanForm & { id: string }) => {
			const formData = new FormData()

			formData.append(
				'requestDate',
				new Date(payload.requestDate).toISOString()
			)

			if (payload.note) formData.append('note', payload.note)

			if (payload.photoUrlIn && payload.photoUrlIn instanceof File) {
				formData.append('photoUrlIn', payload.photoUrlIn)
			}

			return await http.patch<IApi<Loan>>(
				`${urls.loan}/${payload.id}`,
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

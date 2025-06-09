import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toast } from 'sonner'

import { urls } from '@/shared/constants/urls'
import { keys } from '@/shared/constants/keys'
import { Payroll } from '@/shared/types/api'
import { IApi } from '@/shared/types'
import http from '@/shared/utils/http'

import { FormProcess } from '../types'

export const useUpdatePayroll = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async (
			payload: FormProcess & {
				status: 'done' | 'draft'
				id: string
				note?: string
				doneAt?: string
			}
		) => {
			const { data } = await http.patch<IApi<Payroll>>(
				`${urls.payroll}/${payload.id}`,
				payload
			)
			return data
		},
		onSuccess: (data) => {
			queryClient.invalidateQueries({
				queryKey: [keys.payrollDetail, data.data?.id],
			})
			queryClient.invalidateQueries({
				queryKey: [keys.payroll, data.data?.periodId],
			})
			toast.success(data.message)
		},
		onError: (error: AxiosError<any>) => {
			toast.error(error.response?.data.message)
		},
	})
}

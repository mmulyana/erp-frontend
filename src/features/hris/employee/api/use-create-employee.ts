import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'
import { toast } from 'sonner'

import { Employee, IApi } from '@/utils/types/api'
import { urls } from '@/utils/constant/_urls'
import { keys } from '@/utils/constant/_keys'
import http from '@/utils/http'

import { PayloadCreateEmployee } from '../types'

export const useCreateEmployee = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async (
			payload: PayloadCreateEmployee
		): Promise<AxiosResponse<IApi<Employee>>> => {
			return await http.post(urls.employee, payload)
		},
		onSuccess: (data) => {
			queryClient.invalidateQueries({ queryKey: [keys.employee] })
			queryClient.invalidateQueries({
				queryKey: [keys.expireCertification],
			})
			toast.success(data.data.message)
		},
		onError: (error: AxiosError<any>) => {
			if (error.response?.data.errors?.fullname.message) {
				toast.error(error.response?.data.errors?.fullname.message)
			}
		},
	})
}

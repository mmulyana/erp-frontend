import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'
import { toast } from 'sonner'

import { urls } from '@/shared/utils/constant/_urls'
import { keys } from '@/shared/utils/constant/_keys'
import http from '@/shared/utils/http'

import { IApi } from '@/shared/types'
import { Employee } from '../types'
import { toFormData } from '@/shared/utils/helper/to-form-data'

export const useCreateEmployee = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async (
			payload: Employee
		): Promise<AxiosResponse<IApi<Employee>>> => {
			const formData = toFormData(payload)
			return await http.post(urls.employee, formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			})
		},
		onSuccess: (data) => {
			queryClient.invalidateQueries({ queryKey: [keys.employee] })
			toast.success(data.data.message)
		},
		onError: (error: AxiosError<any>) => {
			if (error.response?.data.errors?.fullname.message) {
				toast.error(error.response?.data.errors?.fullname.message)
			}
		},
	})
}

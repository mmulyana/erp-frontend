import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'
import { toast } from 'sonner'

import { Employee, IApi } from '@/shared/types'
import { urls } from '@/shared/constants/urls'
import { keys } from '@/shared/constants/keys'
import { toFormData } from '@/shared/utils'
import http from '@/shared/utils/http'

import { EmployeeForm } from '../types'

export const useDestroyPhotoEmployee = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async (payload: { id: string }) => {
			const res = await http.patch(`${urls.employee}/${payload.id}/photo`)
			return {
				res,
				id: payload.id,
			}
		},
		onSuccess: (data) => {
			queryClient.invalidateQueries({ queryKey: [keys.employee] })
			queryClient.invalidateQueries({ queryKey: [keys.employee, data.id] })
			toast.success(data.res.data.message)
		},
		onError: (error: AxiosError<any>) => {
			if (error.response?.data.errors[0].message) {
				toast.error(error.response?.data.errors[0].message)
				return
			}
			toast.error(error.response?.data.message)
		},
	})
}

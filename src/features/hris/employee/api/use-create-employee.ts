import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'
import { toast } from 'sonner'

import { Employee, IApi } from '@/shared/types'
import { urls } from '@/shared/constants/urls'
import { keys } from '@/shared/constants/keys'
import { toFormData } from '@/shared/utils'
import http from '@/shared/utils/http'

import { EmployeeForm } from '../types'
import { useNavigate } from 'react-router-dom'
import { paths } from '@/shared/constants/paths'

export const useCreateEmployee = () => {
	const queryClient = useQueryClient()
	const navigate = useNavigate()
	return useMutation({
		mutationFn: async (payload: Partial<EmployeeForm>) => {
			const formData = toFormData(payload)
			return await http.post<
				IApi<{
					id: string
				}>
			>(urls.employee + '/pegawai', formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			})
		},
		onSuccess: (data) => {
			queryClient.invalidateQueries({ queryKey: [keys.employee] })
			toast.success(data.data.message, {
				duration: 2000,
				action: {
					label: 'Lihat',
					onClick: () =>
						navigate(`${paths.hrisMasterdataEmployee}/${data.data.data?.id}`),
				},
			})
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

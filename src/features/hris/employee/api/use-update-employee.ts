import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'
import { toast } from 'sonner'

import { Employee, IApi } from '@/utils/types/api'
import { urls } from '@/shared/constants/_urls'
import { keys } from '@/shared/constants/_keys'
import http from '@/shared/utils/http'

import { PayloadCreateEmployee } from '../types'

export const useUpdateEmployee = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async ({
			payload,
			id,
		}: {
			payload: Partial<PayloadCreateEmployee>
			id: number
		}): Promise<AxiosResponse<IApi<Employee>>> => {
			return await http.patch(`${urls.employee}/${id}`, payload)
		},
		onSuccess: (data) => {
			queryClient.invalidateQueries({ queryKey: [keys.employee] })
			queryClient.invalidateQueries({
				queryKey: [keys.employeeDetail, data.data.data?.id],
			})
			queryClient.invalidateQueries({
				queryKey: [keys.expireCertification],
			})
			queryClient.invalidateQueries({
				queryKey: [keys.expireSafety],
			})
			toast.success(data.data.message)
		},
	})
}

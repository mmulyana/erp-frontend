import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toast } from 'sonner'

import { urls } from '@/shared/constants/urls'
import { keys } from '@/shared/constants/keys'
import http from '@/shared/utils/http'

export const useUpdatePeriod = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async (payload: any) => {
			return await http.patch(`${urls.payrollPeriod}/${payload.id}`, payload)
		},
		onSuccess: (data) => {
			queryClient.invalidateQueries({
				queryKey: [keys.payrollPeriodDetail, data.data.data.id],
			})
			toast.success(data.data.message)
		},
		onError: (error: AxiosError<any>) => {
			toast.error(error.response?.data.message)
		},
	})
}

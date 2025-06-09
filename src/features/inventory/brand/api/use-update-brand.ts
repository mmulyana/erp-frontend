import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toast } from 'sonner'

import { urls } from '@/shared/constants/urls'
import { keys } from '@/shared/constants/keys'
import { toFormData } from '@/shared/utils'
import http from '@/shared/utils/http'

export const useUpdateBrand = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async (payload: any) => {
			const formData = toFormData(payload)
			const res = await http.patch(`${urls.brand}/${payload.id}`, formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			})
			return {
				res,
				id: payload.id,
			}
		},
		onSuccess: (data) => {
			queryClient.invalidateQueries({ queryKey: [keys.brand] })
			queryClient.invalidateQueries({ queryKey: [keys.brandInfinite] })
			queryClient.invalidateQueries({ queryKey: [keys.brandDetail, data.id] })
			toast.success(data.res.data.message)
		},
		onError: (error: AxiosError<any>) => {
			toast.error(error.response?.data.message)
		},
	})
}

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toast } from 'sonner'

import { urls } from '@/shared/constants/urls'
import { keys } from '@/shared/constants/keys'
import http from '@/shared/utils/http'

export const useDestroyPhotoBrand = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async (payload: { id: string }) => {
			const res = await http.patch(`${urls.brand}/${payload.id}/photo`)
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
			if (error.response?.data.errors[0].message) {
				toast.error(error.response?.data.errors[0].message)
				return
			}
			toast.error(error.response?.data.message)
		},
	})
}

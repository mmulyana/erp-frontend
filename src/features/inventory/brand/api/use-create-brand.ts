import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toast } from 'sonner'

import { urls } from '@/shared/constants/urls'
import { keys } from '@/shared/constants/keys'

import http from '@/shared/utils/http'
import { toFormData } from '@/shared/utils'

export const useCreateBrand = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async (payload: any) => {
			const formData = toFormData(payload)
			return await http.post(urls.inventoryBrand, formData)
		},
		onSuccess: (data) => {
			queryClient.invalidateQueries({ queryKey: [keys.brand] })
			queryClient.invalidateQueries({ queryKey: [keys.brandInfinite] })
			toast.success(data.data.message)
		},
		onError: (error: AxiosError<any>) => {
			toast.error(error.response?.data.message)
		},
	})
}

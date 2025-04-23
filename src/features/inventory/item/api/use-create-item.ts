import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toast } from 'sonner'

import { urls } from '@/shared/constants/urls'
import { keys } from '@/shared/constants/keys'
import { toFormData } from '@/shared/utils'
import http from '@/shared/utils/http'
import { ItemForm } from '../types'

export const useCreateItem = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async (payload: ItemForm) => {
			const formData = toFormData(payload)
			return await http.post(urls.item, formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			})
		},
		onSuccess: (data) => {
			queryClient.invalidateQueries({ queryKey: [keys.item] })
			queryClient.invalidateQueries({ queryKey: [keys.itemInfinite] })
			toast.success(data.data.message)
		},
		onError: (error: AxiosError<any>) => {
			toast.error(error.response?.data.message)
		},
	})
}

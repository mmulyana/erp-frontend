import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toast } from 'sonner'

import { urls } from '@/shared/constants/urls'
import { keys } from '@/shared/constants/keys'
import http from '@/shared/utils/http'

export const useDeleteItem = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async (payload: { id: string }) => {
			return await http.delete(`${urls.item}/${payload.id}`)
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

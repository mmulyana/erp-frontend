import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toast } from 'sonner'

import { urls } from '@/shared/constants/urls'
import { keys } from '@/shared/constants/keys'
import http from '@/shared/utils/http'
import { ClientForm } from '../types'

export const useCreateClient = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async (payload: ClientForm) => {
			return await http.post(urls.client, payload)
		},
		onSuccess: (data) => {
			queryClient.invalidateQueries({ queryKey: [keys.client] })
			queryClient.invalidateQueries({ queryKey: [keys.clientInfinite] })
			toast.success(data.data.message)
		},
		onError: (error: AxiosError<any>) => {
			toast.error(error.response?.data.message)
		},
	})
}

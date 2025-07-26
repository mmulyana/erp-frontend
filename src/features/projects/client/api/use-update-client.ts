import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toast } from 'sonner'

import { urls } from '@/shared/constants/urls'
import { keys } from '@/shared/constants/keys'
import http from '@/shared/utils/http'

import { ClientForm } from '../types'

export const useUpdateClient = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async (payload: ClientForm & { id: string }) => {
			const res = await http.patch(`${urls.client}/${payload.id}`, payload)
			return {
				res,
				id: payload.id,
			}
		},
		onSuccess: (data) => {
			queryClient.invalidateQueries({ queryKey: [keys.client] })
			queryClient.invalidateQueries({ queryKey: [keys.clientInfinite] })
			queryClient.invalidateQueries({ queryKey: [keys.clientDetail, data.id] })
			toast.success(data.res.data.message)
		},
		onError: (error: AxiosError<any>) => {
			toast.error(error.response?.data.message)
		},
	})
}

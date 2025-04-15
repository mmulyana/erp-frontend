import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toast } from 'sonner'

import { urls } from '@/shared/constants/_urls'
import { ApiError } from '@/utils/types/api'
import http from '@/shared/utils/http'

import { UpdateUser } from '../types'
import { keys } from '@/shared/constants/_keys'

export const useUpdateUser = () => {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: async ({
			id,
			payload,
		}: {
			id: string
			payload: UpdateUser
		}) => {
			const res = await http.patch(`${urls.user}/${id}`, payload)
			return {
				...res,
				id,
			}
		},
		onSuccess: (data) => {
			toast.success(data.data.message)
			queryClient.invalidateQueries({ queryKey: [keys.user] })
			queryClient.invalidateQueries({ queryKey: [keys.user, data.id] })
		},
		onError: (error: AxiosError<ApiError>) => {
			toast.error(error.response?.data.message)
		},
	})
}

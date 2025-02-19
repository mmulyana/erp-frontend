import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toast } from 'sonner'

import { objectToFormData } from '@/utils/ObjectToFormData'
import { URLS } from '@/utils/constant/_urls'
import { ApiError } from '@/utils/types/api'
import http from '@/utils/http'

import { UpdateUser } from '../types'
import { KEYS } from '@/utils/constant/_keys'

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
			const res = await http.patch(`${URLS.USER}/${id}`, payload)
			return {
				...res,
				id,
			}
		},
		onSuccess: (data) => {
			toast.success(data.data.message)
			queryClient.invalidateQueries({ queryKey: [KEYS.USER] })
			queryClient.invalidateQueries({ queryKey: [KEYS.USER, data.id] })
		},
		onError: (error: AxiosError<ApiError>) => {
			toast.error(error.response?.data.message)
		},
	})
}

import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toast } from 'sonner'

import { urls } from '@/shared/constants/_urls'
import { ApiError } from '@/utils/types/api'
import http from '@/shared/utils/http'

import { UpdatePassword } from '../types'

export const useUpdatePassword = () => {
	return useMutation({
		mutationFn: async ({
			id,
			payload,
		}: {
			id: string
			payload: UpdatePassword
		}) => {
			return await http.patch(`${urls.user}/${id}/password/update`, payload)
		},
		onSuccess: (data) => {
			toast.success(data.data.message)
		},
		onError: (error: AxiosError<ApiError>) => {
			toast.error(error?.response?.data.message)
		},
	})
}

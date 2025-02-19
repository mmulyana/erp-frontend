import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toast } from 'sonner'

import { URLS } from '@/utils/constant/_urls'
import { ApiError } from '@/utils/types/api'
import http from '@/utils/http'

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
			return await http.patch(`${URLS.ACCOUNT}/${id}/password/update`, payload)
		},
		onSuccess: (data) => {
			toast.success(data.data.message)
		},
		onError: (error: AxiosError<ApiError>) => {
			toast.error(error?.response?.data.message)
		},
	})
}

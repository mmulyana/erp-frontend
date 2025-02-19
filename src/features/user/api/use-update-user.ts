import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toast } from 'sonner'

import { objectToFormData } from '@/utils/ObjectToFormData'
import { URLS } from '@/utils/constant/_urls'
import { ApiError } from '@/utils/types/api'
import http from '@/utils/http'

import { UpdateUser } from '../types'

export const useUpdateUser = () => {
	return useMutation({
		mutationFn: async ({
			id,
			payload,
		}: {
			id: string
			payload: UpdateUser
		}) => {
			const formData = objectToFormData(payload)
			return await http.patch(`${URLS.ACCOUNT}/${id}`, formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			})
		},
		onSuccess: (data) => {
			toast.success(data.data.message)
		},
		onError: (error: AxiosError<ApiError>) => {
			toast.error(error.response?.data.message)
		},
	})
}

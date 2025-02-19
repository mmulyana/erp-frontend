import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toast } from 'sonner'

import { URLS } from '@/utils/constant/_urls'
import { ApiError } from '@/utils/types/api'
import http from '@/utils/http'

export const useResetPassword = () => {
	return useMutation({
		mutationFn: async ({ id }: { id: string }) => {
			return await http.patch(`${URLS.USER}/${id}/password/reset`)
		},
		onSuccess: (data) => {
			toast.success(data.data.message)
		},
		onError: (error: AxiosError<ApiError>) => {
			toast.error(error?.response?.data.message)
		},
	})
}

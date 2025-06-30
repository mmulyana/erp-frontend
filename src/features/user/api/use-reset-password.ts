import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toast } from 'sonner'

import { urls } from '@/shared/constants/urls'
import { keys } from '@/shared/constants/keys'
import http from '@/shared/utils/http'

export const useResetPassword = () => {
	return useMutation({
		mutationFn: async ({ id }: { id: string }) => {
			const res = await http.patch(`${urls.account}/${id}/reset-password`)
			return res
		},
		onSuccess: (data) => {
			toast.success(data.data.message)
		},
		onError: (error: AxiosError<any>) => {
			toast.error(error.response?.data.message)
		},
	})
}

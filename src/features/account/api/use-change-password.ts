import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toast } from 'sonner'

import { urls } from '@/shared/constants/urls'
import { keys } from '@/shared/constants/keys'
import http from '@/shared/utils/http'

import { PasswordForm } from '../types'

export const useChangePassword = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async (payload: PasswordForm & { id: string }) => {
			const res = await http.patch(
				`${urls.account}/${payload.id}/password`,
				payload
			)
			return res
		},
		onSuccess: (data) => {
			queryClient.invalidateQueries({ queryKey: [keys.me] })
			toast.success(data.data.message)
		},
		onError: (error: AxiosError<any>) => {
			toast.error(error.response?.data.message)
		},
	})
}

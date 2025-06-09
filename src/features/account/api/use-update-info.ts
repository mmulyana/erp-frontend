import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toast } from 'sonner'

import { urls } from '@/shared/constants/urls'
import { keys } from '@/shared/constants/keys'
import { toFormData } from '@/shared/utils'
import http from '@/shared/utils/http'
import { UserForm } from '../types'

export const useUpdateInfo = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async (payload: UserForm & { id: string }) => {
			const formData = toFormData(payload)
			const res = await http.patch(
				`${urls.account}/${payload.id}/info`,
				formData,
				{
					headers: {
						'Content-Type': 'multipart/form-data',
					},
				}
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

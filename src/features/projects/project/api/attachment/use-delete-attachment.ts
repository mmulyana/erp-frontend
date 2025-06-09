import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toast } from 'sonner'

import { urls } from '@/shared/constants/urls'
import { keys } from '@/shared/constants/keys'
import http from '@/shared/utils/http'

export const useDeleteAttachment = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async ({ id }: { id: string }) => {
			const { data } = await http.delete(
				`${urls.project}/data/attachment/${id}`
			)
			return data
		},
		onSuccess: (data) => {
			queryClient.invalidateQueries({
				queryKey: [keys.projectAttachment],
			})
			toast.success(data?.message)
		},
		onError: (error: AxiosError<any>) => {
			toast.error(error.response?.data.message)
		},
	})
}

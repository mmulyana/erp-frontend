import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { keys } from '@/utils/constant/_keys'
import { urls } from '@/utils/constant/_urls'
import http from '@/utils/http'

export const useDeleteUser = () => {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: async ({ id }: { id: string }) => {
			return await http.delete(`${urls.user}/${id}`)
		},
		onSuccess(data) {
			toast.success(data.data.message)
			queryClient.invalidateQueries({
				queryKey: [keys.user],
			})
		},
	})
}

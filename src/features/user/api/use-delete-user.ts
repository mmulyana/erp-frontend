import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { KEYS } from '@/utils/constant/_keys'
import { URLS } from '@/utils/constant/_urls'
import http from '@/utils/http'

export const useDeleteUser = () => {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: async ({ id }: { id: string }) => {
			return await http.delete(`${URLS.USER}/${id}`)
		},
		onSuccess(data) {
			toast.success(data.data.message)
			queryClient.invalidateQueries({
				queryKey: [KEYS.USER],
			})
		},
	})
}

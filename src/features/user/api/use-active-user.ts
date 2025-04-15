import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { keys } from '@/shared/constants/_keys'
import { urls } from '@/shared/constants/_urls'
import http from '@/shared/utils/http'

export const useActiveUser = () => {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: async ({ id }: { id: string }) => {
			return await http.patch(`${urls.user}/${id}/activate`)
		},
		onSuccess(data) {
			toast.success(data.data.message)
			queryClient.invalidateQueries({
				queryKey: [keys.user],
			})
		},
	})
}

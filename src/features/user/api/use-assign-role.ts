import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { keys } from '@/utils/constant/_keys'
import { urls } from '@/utils/constant/_urls'
import http from '@/utils/http'

export const useAssignRole = () => {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: async ({ id, roleId }: { id: string; roleId: string }) => {
			return await http.patch(`${urls.user}/${id}/role/add`, { roleId })
		},
		onSuccess(data) {
			toast.success(data.data.message)
			queryClient.invalidateQueries({
				queryKey: [keys.user],
			})
		},
	})
}

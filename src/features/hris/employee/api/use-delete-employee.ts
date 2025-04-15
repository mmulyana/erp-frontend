import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { keys } from '@/shared/utils/constant/_keys'
import { urls } from '@/shared/utils/constant/_urls'
import http from '@/shared/utils/http'

export const useDeleteEmployee = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async ({ id }: { id: number }) => {
			return await http.delete(`${urls.employee}/${id}`)
		},
		onSuccess: (data) => {
			queryClient.invalidateQueries({ queryKey: [keys.employee] })
			queryClient.invalidateQueries({
				queryKey: [keys.employeeTotal],
			})
			toast.success(data.data.message)
		},
	})
}

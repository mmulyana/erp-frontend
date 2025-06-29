import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { keys } from '@/shared/constants/keys'
import { urls } from '@/shared/constants/urls'
import http from '@/shared/utils/http'

export const useDeleteCashAdvance = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async ({ id }: { id: string }) => {
			return await http.delete(`${urls.cashAdvances}/${id}`)
		},
		onSuccess: (data) => {
			queryClient.invalidateQueries({ queryKey: [keys.cashAdvances] })
			queryClient.invalidateQueries({ queryKey: [keys.cashAdvancesReport] })
			toast.success(data.data.message)
		},
	})
}

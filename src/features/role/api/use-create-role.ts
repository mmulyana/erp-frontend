import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { CreateRole } from '@/utils/types/form'
import { KEYS } from '@/utils/constant/_keys'
import { URLS } from '@/utils/constant/_urls'
import http from '@/utils/http'

export const useCreateRole = () => {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: async (payload: CreateRole) => {
			return await http.post(URLS.ROLE, payload)
		},
		onSuccess: (data) => {
			queryClient.invalidateQueries({ queryKey: [KEYS.ROLES] })
			toast.success(data.data.message)
		},
	})
}

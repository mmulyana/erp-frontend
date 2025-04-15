import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { keys } from '@/shared/constants/_keys'
import { urls } from '@/shared/constants/_urls'
import http from '@/shared/utils/http'

import { CreateRole } from '../type'

export const useCreateRole = () => {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: async (payload: CreateRole) => {
			return await http.post(urls.role, payload)
		},
		onSuccess: (data) => {
			queryClient.invalidateQueries({ queryKey: [keys.roles] })
			toast.success(data.data.message)
		},
	})
}

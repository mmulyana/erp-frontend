import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { keys } from '@/utils/constant/_keys'
import { urls } from '@/utils/constant/_urls'
import http from '@/utils/http'

import { CreateRole } from '../type'

export const useUpdateRole = () => {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: async ({
			id,
			payload,
		}: {
			id: string
			payload: CreateRole
		}) => {
			return await http.patch(`${urls.role}/${id}`, payload)
		},
		onSuccess: (data) => {
			queryClient.invalidateQueries({ queryKey: [keys.roles] })
			toast.success(data.data.message)
		},
	})
}

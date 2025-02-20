import { useMutation, useQueryClient } from '@tanstack/react-query'

import { CreateRole } from '@/utils/types/form'
import { KEYS } from '@/utils/constant/_keys'
import { URLS } from '@/utils/constant/_urls'
import http from '@/utils/http'
import { toast } from 'sonner'

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
			return await http.patch(`${URLS.ROLE}/${id}`, payload)
		},
		onSuccess: (data) => {
			queryClient.invalidateQueries({ queryKey: [KEYS.ROLES] })
			toast.success(data.data.message)
		},
	})
}

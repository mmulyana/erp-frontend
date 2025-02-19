import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toast } from 'sonner'

import { KEYS } from '@/utils/constant/_keys'
import { URLS } from '@/utils/constant/_urls'
import { ApiError } from '@/utils/types/api'
import http from '@/utils/http'

export const useDeleteRole = () => {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: async ({ id }: { id: string }) => {
			return await http.delete(`${URLS.ROLE}/${id}`)
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [KEYS.ROLES] })
		},
		onError: (err: AxiosError<ApiError>) => {
			toast.error(err.response?.data.message)
		},
	})
}

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'
import { toast } from 'sonner'

import { urls } from '@/shared/constants/urls'
import { keys } from '@/shared/constants/keys'
import { IApi } from '@/shared/types'

import http from '@/shared/utils/http'
import { Role } from '@/shared/types/api'

export const useCreateRole = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async (
			payload: Partial<Role>
		): Promise<AxiosResponse<IApi<any>>> => {
			return await http.post(urls.role, payload)
		},
		onSuccess: (data) => {
			queryClient.invalidateQueries({ queryKey: [keys.roles] })
			toast.success(data.data.message)
		},
		onError: (error: AxiosError<any>) => {
			toast.error(error.response?.data.message)
		},
	})
}

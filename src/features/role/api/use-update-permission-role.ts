import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'
import { toast } from 'sonner'

import { urls } from '@/shared/constants/urls'
import { IApi } from '@/shared/types'

import http from '@/shared/utils/http'
import { Role } from '@/shared/types/api'
import { keys } from '@/shared/constants/keys'

export const useUpdatePermissionRole = () => {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: async (payload: {
			id: string
			permissions: string
		}): Promise<AxiosResponse<IApi<Role>>> => {
			return await http.patch(`${urls.role}/${payload.id}`, payload)
		},
		onSuccess: (data) => {
			queryClient.invalidateQueries({ queryKey: [keys.me] })
			toast.success(data.data.message)
		},
		onError: (error: AxiosError<any>) => {
			toast.error(error.response?.data.message)
		},
	})
}

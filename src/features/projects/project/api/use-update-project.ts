import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toast } from 'sonner'

import { urls } from '@/shared/constants/urls'
import { keys } from '@/shared/constants/keys'
import http from '@/shared/utils/http'

import { ProjectForm } from '../types'

export const useUpdateProject = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async (payload: Partial<ProjectForm> & { id: string }) => {
			const res = await http.patch(`${urls.project}/${payload.id}`, payload)
			return {
				res,
				id: payload.id,
			}
		},
		onSuccess: (data) => {
			queryClient.invalidateQueries({ queryKey: [keys.project] })
			queryClient.invalidateQueries({ queryKey: [keys.projectInfinite] })
			queryClient.invalidateQueries({ queryKey: [keys.projectDetail, data.id] })
			toast.success(data.res.data.message)
		},
		onError: (error: AxiosError<any>) => {
			toast.error(error.response?.data.message)
		},
	})
}

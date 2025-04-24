import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toast } from 'sonner'

import { urls } from '@/shared/constants/urls'
import { keys } from '@/shared/constants/keys'
import http from '@/shared/utils/http'

import { ProjectForm } from '../types'
import { IApi } from '@/shared/types'

export const useCreateProject = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async (payload: ProjectForm) => {
			const { data } = await http.post<
				IApi<{
					id: string
				}>
			>(urls.project, payload)
			return data
		},
		onSuccess: (data) => {
			queryClient.invalidateQueries({ queryKey: [keys.project] })
			queryClient.invalidateQueries({ queryKey: [keys.projectInfinite] })
			toast.success(data?.message)
		},
		onError: (error: AxiosError<any>) => {
			toast.error(error.response?.data.message)
		},
	})
}

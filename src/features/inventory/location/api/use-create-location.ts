import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'
import { toast } from 'sonner'

import { urls } from '@/shared/constants/urls'
import { keys } from '@/shared/constants/keys'
import { IApi } from '@/shared/types'

import http from '@/shared/utils/http'

export const useCreateLocation = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async (payload: any): Promise<AxiosResponse<IApi<any>>> => {
			return await http.post(urls.location, payload)
		},
		onSuccess: (data) => {
			queryClient.invalidateQueries({ queryKey: [keys.location] })
			queryClient.invalidateQueries({ queryKey: [keys.locationInfinite] })
			toast.success(data.data.message)
		},
		onError: (error: AxiosError<any>) => {
			toast.error(error.response?.data.message)
		},
	})
}

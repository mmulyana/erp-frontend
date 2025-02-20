import { useMutation, useQueryClient } from '@tanstack/react-query'
import { PayloadUploadPhoto } from '../types'
import http from '@/utils/http'
import { urls } from '@/utils/constant/_urls'
import { toast } from 'sonner'
import { AxiosResponse } from 'axios'
import { IApi } from '@/utils/types/api'
import { keys } from '@/utils/constant/_keys'

export const useUploadPhoto = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async (payload: PayloadUploadPhoto) => {
			const formData = new FormData()
			formData.append('photo', payload.photo)

			return await http.patch(
				`${urls.employee}/update-photo/${payload.id}`,
				formData,
				{
					headers: {
						'Content-Type': 'multipart/form-data',
					},
				}
			)
		},
		onSuccess: (data) => {
			queryClient.invalidateQueries({ queryKey: [keys.employee] })
			toast.success(data.data.message)
		},
	})
}

export const useRemovePhoto = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async ({
			id,
		}: {
			id: number
		}): Promise<AxiosResponse<IApi<{ id: number; photo?: null | string }>>> => {
			return await http.patch(`${urls.employee}/delete-photo/${id}`)
		},
		onSuccess: (data) => {
			queryClient.invalidateQueries({
				queryKey: [keys.employee, data.data.data?.id],
			})
			toast.success(data.data.message)
		},
	})
}

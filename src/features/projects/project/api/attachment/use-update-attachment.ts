import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toast } from 'sonner'

import { urls } from '@/shared/constants/urls'
import { keys } from '@/shared/constants/keys'
import { toFormData } from '@/shared/utils'
import http from '@/shared/utils/http'

import { AttachmentForm } from '../../types'

export const useUpdateAttachment = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async (payload: AttachmentForm & { id: string }) => {
			const formData = toFormData(payload)
			const { data } = await http.patch(
				`${urls.project}/data/attachment/${payload.id}`,
				formData
			)
			return { res: data, id: payload.projectId }
		},
		onSuccess: (data) => {
			queryClient.invalidateQueries({
				queryKey: [keys.projectAttachment, data.id],
			})
			toast.success(data?.res.message)
		},
		onError: (error: AxiosError<any>) => {
			toast.error(error.response?.data.message)
		},
	})
}

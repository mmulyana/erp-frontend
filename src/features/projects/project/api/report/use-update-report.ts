import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { urls } from '@/shared/constants/urls'
import http from '@/shared/utils/http'

import { ReportMutate } from '../../types'
import { keys } from '@/shared/constants/keys'

export const useUpdateReport = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async (
			payload: Partial<ReportMutate> & {
				id: string
				deleteAttachments?: string[]
			}
		) => {
			const formData = new FormData()

			if (payload.message) formData.append('message', payload.message)
			if (payload.type) formData.append('type', payload.type)

			payload.attachments?.forEach((file) => {
				if (file) formData.append('photoUrl', file)
			})

			payload.deleteAttachments?.forEach((id) => {
				formData.append('deleteAttachments', id)
			})

			const res = await http.patch(
				`${urls.project}/report/${payload.id}`,
				formData,
				{
					headers: {
						'Content-Type': 'multipart/form-data',
					},
				}
			)

			return res.data.data
		},
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: [keys.projectReport],
			})
			toast.success('Report berhasil diperbarui.')
		},
		onError: () => {
			toast.error('Gagal memperbarui report.')
		},
	})
}

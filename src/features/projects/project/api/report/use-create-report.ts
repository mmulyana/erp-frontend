import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { urls } from '@/shared/constants/urls'
import http from '@/shared/utils/http'

import { ReportMutate } from '../../types'
import { keys } from '@/shared/constants/keys'

export const useCreateReport = () => {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: async (payload: ReportMutate) => {
			const formData = new FormData()
			formData.append('message', payload.message)
			formData.append('type', payload.type)
			formData.append('projectId', payload.projectId)

			payload.attachments?.forEach((file) => {
				if (file) formData.append('photoUrl', file)
			})

			const res = await http.post(urls.project + '/report', formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			})

			return res.data.data
		},
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: [keys.projectReport],
			})
			toast.success('Report berhasil dikirim.')
		},
		onError: () => {
			toast.error('Gagal mengirim report.')
		},
	})
}

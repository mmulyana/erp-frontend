import { useMutation } from '@tanstack/react-query'
import { urls } from '@/shared/constants/urls'
import http from '@/shared/utils/http'

import { loanForm } from '../types'

export function useCreateLoan() {
	return useMutation({
		mutationFn: async (payload: loanForm) => {
			const formData = new FormData()

			formData.append('inventoryId', payload.inventoryId)
			formData.append('requestQuantity', payload.requestQuantity.toString())
			formData.append(
				'requestDate',
				new Date(payload.requestDate).toISOString()
			)

			if (payload.note) formData.append('note', payload.note)
			if (payload.projectId) formData.append('projectId', payload.projectId)

			if (payload.filephotoUrlIn && Array.isArray(payload.filephotoUrlIn)) {
				for (const file of payload.filephotoUrlIn) {
					if (file instanceof File) {
						formData.append('photoUrl', file)
					}
				}
			}

			return await http.post(urls.loan, formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			})
		},
	})
}

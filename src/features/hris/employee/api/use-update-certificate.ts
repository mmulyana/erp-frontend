import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toast } from 'sonner'

import { urls } from '@/shared/constants/urls'
import { keys } from '@/shared/constants/keys'
import { toFormData } from '@/shared/utils'
import http from '@/shared/utils/http'

import { CertificateForm } from '../types'

export const useUpdateCertificate = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async (payload: Partial<CertificateForm & { id: string, employeeId: string }>) => {
			const formData = toFormData(payload)
			const res = await http.patch(
				`${urls.employee}/data/certificate/${payload.id}`,
				formData,
				{
					headers: {
						'Content-Type': 'multipart/form-data',
					},
				}
			)
			return {
				res,
				id: payload.id,
				employeeId: payload.employeeId
			}
		},
		onSuccess: (data) => {
			queryClient.invalidateQueries({
				queryKey: [keys.certificate, data.id],
			})
			queryClient.invalidateQueries({
				queryKey: [keys.employeeCertificates, data.employeeId],
			})
			toast.success(data.res.data.message)
		},
		onError: (error: AxiosError<any>) => {
			if (error.response?.data.errors[0].message) {
				toast.error(error.response?.data.errors[0].message)
				return
			}
			toast.error(error.response?.data.message)
		},
	})
}

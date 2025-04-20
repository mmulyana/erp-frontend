import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toast } from 'sonner'

import { urls } from '@/shared/constants/urls'
import { keys } from '@/shared/constants/keys'
import http from '@/shared/utils/http'

export const useDeleteCertificate = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async (payload: { id: string; employeeId: string }) => {
			const res = await http.delete(`${urls.certificate}/${payload.id}`)
			return {
				res,
				employeeId: payload.employeeId,
			}
		},
		onSuccess: (data) => {
			queryClient.invalidateQueries({
				queryKey: [keys.employeeCertificates, data.employeeId],
			})
			toast.success(data.res.data.message)
		},
		onError: (error: AxiosError<any>) => {
			toast.error(error.response?.data.message)
		},
	})
}

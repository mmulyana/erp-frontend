import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toast } from 'sonner'

import { urls } from '@/shared/constants/urls'
import { keys } from '@/shared/constants/keys'
import http from '@/shared/utils/http'

import { OvertimeForm } from '../../types'

export const useUpdateOvertime = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async (
			payload: OvertimeForm & {
				id: string
			}
		) => {
			const res = await http.patch(`${urls.overtime}/${payload.id}`, payload)
			return {
				res,
				id: payload.id,
			}
		},
		onSuccess: (data) => {
			queryClient.invalidateQueries({ queryKey: [keys.overtime] })
			queryClient.invalidateQueries({
				queryKey: [keys.overtimeDetail, data.id],
			})
			queryClient.invalidateQueries({ queryKey: [keys.overtimeTotalPerDay] })

			toast.success(data.res.data.message)
		},
		onError: (error: AxiosError<any>) => {
			toast.error(error.response?.data.message)
		},
	})
}

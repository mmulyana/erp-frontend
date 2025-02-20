import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { createPosition } from '@/utils/types/form'
import { IApi, Position } from '@/utils/types/api'
import { Pagination } from '@/utils/types/common'
import { keys } from '../../utils/constant/_keys'
import { urls } from '@/utils/constant/_urls'
import { toast } from 'sonner'
import http from '@/utils/http'
import { AxiosResponse } from 'axios'

type Params = Pagination & {
	name?: string
}
export const usePosition = (params?: Params) => {
	return useQuery({
		queryKey: [keys.hrisPosition, params],
		queryFn: async (): Promise<AxiosResponse<IApi<Position[]>>> => {
			return await http.request({
				method: 'GET',
				url: urls.hrisPosition,
				params,
			})
		},
	})
}

export const useDetailPosition = ({
	id,
	enabled,
}: {
	id?: number
	enabled: boolean
}) => {
	return useQuery({
		queryKey: [keys.hrisPosition, id],
		queryFn: async (): Promise<AxiosResponse<IApi<Position>>> => {
			return await http(`${urls.hrisPosition}/${id}`)
		},
		enabled,
	})
}

export const useCreatePosition = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async (payload: createPosition) => {
			return await http.post(urls.hrisPosition, payload)
		},
		onSuccess: (data) => {
			queryClient.invalidateQueries({
				queryKey: [keys.hrisPosition],
			})
			queryClient.invalidateQueries({
				queryKey: [keys.employeeTotal],
			})
			toast.success(data?.data?.message)
		},
	})
}

export const useUpdatePosition = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async (payload: createPosition & { id: number }) => {
			return await http.patch(`${urls.hrisPosition}/${payload.id}`, payload)
		},
		onSuccess: (data) => {
			queryClient.invalidateQueries({
				queryKey: [keys.hrisPosition],
			})
			queryClient.invalidateQueries({
				queryKey: [keys.employeeTotal],
			})
			toast.success(data?.data?.message)
		},
	})
}

export const useDeletePosition = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async (payload: { id: number }) => {
			return await http.delete(`${urls.hrisPosition}/${payload.id}`)
		},
		onSuccess: (data) => {
			queryClient.invalidateQueries({
				queryKey: [keys.hrisPosition],
			})
			queryClient.invalidateQueries({
				queryKey: [keys.employeeTotal],
			})
			toast.success(data?.data?.message)
		},
	})
}

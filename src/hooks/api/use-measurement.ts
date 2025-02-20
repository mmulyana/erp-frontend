import { keys } from '@/utils/constant/_keys'
import { urls } from '@/utils/constant/_urls'
import http from '@/utils/http'
import { GoodsMeasurement, IApi } from '@/utils/types/api'
import { Pagination } from '@/utils/types/common'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'
import { toast } from 'sonner'

type Params = Pagination & {
	name?: string
}
export const useMeasurement = (params?: Params) => {
	return useQuery({
		queryFn: async (): Promise<AxiosResponse<IApi<GoodsMeasurement[]>>> => {
			return await http(urls.inventoryMeasurement, {
				params,
			})
		},
		queryKey: [keys.measurement, params],
	})
}

export const useDetailMeasurement = ({
	id,
	enabled,
}: {
	id?: number | null
	enabled?: boolean
}) => {
	return useQuery({
		queryFn: async (): Promise<AxiosResponse<IApi<GoodsMeasurement>>> => {
			return await http(`${urls.inventoryMeasurement}/${id}`)
		},
		queryKey: [keys.measurementDetail, id],
		enabled,
	})
}

export const useCreateMeasurement = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async ({
			payload,
		}: {
			payload: {
				name: string
			}
		}) => {
			return await http.post(urls.inventoryMeasurement, payload)
		},
		onSuccess: (data) => {
			queryClient.invalidateQueries({ queryKey: [keys.measurement] })
			toast.success(data.data.message)
		},
	})
}

export const useUpdateMeasurement = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async ({
			payload,
		}: {
			payload: {
				name: string
				id: number
			}
		}): Promise<AxiosResponse<IApi<GoodsMeasurement>>> => {
			return await http.patch(`${urls.inventoryMeasurement}/${payload.id}`, {
				name: payload.name,
			})
		},
		onSuccess: (data) => {
			queryClient.invalidateQueries({ queryKey: [keys.measurement] })
			queryClient.invalidateQueries({
				queryKey: [keys.measurementDetail, data.data.data?.id],
			})
			toast.success(data.data.message)
		},
	})
}

export const useDeleteMeasurement = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async ({ id }: { id: number }) => {
			return await http.delete(`${urls.inventoryMeasurement}/${id}`)
		},
		onSuccess: (data) => {
			queryClient.invalidateQueries({ queryKey: [keys.measurement] })
			toast.success(data.data.message)
		},
	})
}

import { keys } from '@/utils/constant/_keys'
import { urls } from '@/utils/constant/_urls'
import http from '@/utils/http'
import { Competency, IApi } from '@/utils/types/api'
import { Pagination } from '@/utils/types/common'
import { createLabel } from '@/utils/types/form'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'
import { toast } from 'sonner'

type Params = Pagination & { name?: string }
export const useCompetency = (params?: Params) => {
	return useQuery({
		queryFn: async (): Promise<AxiosResponse<IApi<Competency[]>>> => {
			return await http(urls.competency, { params })
		},
		queryKey: [keys.competency, params],
	})
}

export const useDetailCompetency = ({
	id,
	enabled,
}: {
	id?: number | null
	enabled?: boolean
}) => {
	return useQuery({
		queryFn: async (): Promise<AxiosResponse<IApi<Competency>>> => {
			return await http(`${urls.competency}/${id}`)
		},
		queryKey: [keys.competency, id],
		enabled,
	})
}

export const useCreateCompetency = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async ({ payload }: { payload: createLabel }) => {
			return await http.post(urls.competency, payload)
		},
		onSuccess: (data) => {
			queryClient.invalidateQueries({ queryKey: [keys.competency] })
			toast.success(data.data.message)
		},
	})
}

export const useUpdateCompetency = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async ({
			payload,
		}: {
			payload: createLabel & {
				id: number
			}
		}): Promise<AxiosResponse<IApi<Competency>>> => {
			return await http.patch(`${urls.competency}/${payload.id}`, {
				name: payload.name,
				color: payload.color,
			})
		},
		onSuccess: (data) => {
			queryClient.invalidateQueries({ queryKey: [keys.competency] })
			queryClient.invalidateQueries({
				queryKey: [keys.competency, data.data.data?.id],
			})
			toast.success(data.data.message)
		},
	})
}

export const useDeleteCompetency = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async ({ id }: { id: number }) => {
			return await http.delete(`${urls.competency}/${id}`)
		},
		onSuccess: (data) => {
			queryClient.invalidateQueries({ queryKey: [keys.competency] })
			toast.success(data.data.message)
		},
	})
}

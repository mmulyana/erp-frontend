import { keys } from '@/utils/constant/_keys'
import { urls } from '@/utils/constant/_urls'
import { Pagination } from '@/utils/types/common'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import http from '@/utils/http'
import { createLabel } from '@/utils/types/form'
import { toast } from 'sonner'
import { AxiosResponse } from 'axios'
import { IApi, ProjectLabel } from '@/utils/types/api'

type Params = Pagination & {
	name?: string
	tag?: string
}
export const useProjectLabels = (params?: Params) => {
	return useQuery({
		queryFn: async (): Promise<AxiosResponse<IApi<ProjectLabel[]>>> => {
			return await http(urls.projectLabel, {
				params,
			})
		},
		queryKey: [keys.projectLabel, params],
	})
}
export const useDetailProjectLabel = ({
	id,
	enabled,
}: {
	id?: number | null
	enabled?: boolean
}) => {
	return useQuery({
		queryFn: async (): Promise<AxiosResponse<IApi<ProjectLabel>>> => {
			return await http(`${urls.projectLabel}/${id}`)
		},
		queryKey: [keys.projectLabelDetail, id],
		enabled,
	})
}

export const useCreateProjectLabel = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async ({ payload }: { payload: createLabel }) => {
			return await http.post(urls.projectLabel, payload)
		},
		onSuccess: (data) => {
			queryClient.invalidateQueries({ queryKey: [keys.projectLabel] })
			toast.success(data.data.message)
		},
	})
}
export const useUpdateProjectLabel = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async ({
			payload,
		}: {
			payload: createLabel & { id: number }
		}) => {
			return await http.patch(`${urls.projectLabel}/${payload.id}`, {
				name: payload.name,
				color: payload.color,
			})
		},
		onSuccess: (data) => {
			queryClient.invalidateQueries({ queryKey: [keys.projectLabel] })
			toast.success(data.data.message)
		},
	})
}

export const useDeleteProjectLabel = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async ({ id }: { id: number }) => {
			return await http.delete(urls.projectLabel + '/' + id)
		},
		onSuccess: (data) => {
			queryClient.invalidateQueries({ queryKey: [keys.projectLabel] })
			toast.success(data.data.message)
		},
	})
}

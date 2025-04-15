import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'
import { toast } from 'sonner'

import { keys } from '@/shared/constants/_keys'
import { urls } from '@/shared/constants/_urls'
import { IApi } from '@/utils/types/api'
import http from '@/shared/utils/http'

import { CreateCertif } from '../types'

export const useCreateMultipleCertif = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async (payload: {
			employeeId: number
			data: CreateCertif[]
		}) => {
			const formData = new FormData()

			payload.data.forEach((item) => {
				Object.entries(item).forEach(([key, value]) => {
					if (key === 'certif_file') {
						if (value instanceof File) {
							formData.append(key, value)
						}
					} else if (typeof value == 'number') {
						formData.append(key, String(value))
					} else if (value !== null && typeof value == 'string') {
						formData.append(key, value)
					}
				})
			})

			return await http.post(
				urls.employee +
					`/certification/${payload.employeeId}?file_name=sertifikat-`,
				formData,
				{
					headers: {
						'Content-Type': 'multipart/form-data',
					},
				}
			)
		},
		onSuccess: (data) => {
			queryClient.invalidateQueries({ queryKey: [keys.employee] })
			queryClient.invalidateQueries({
				queryKey: [keys.expireCertification],
			})
			toast.success(data.data.message)
		},
	})
}

export const useCreateCertif = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async (payload: { employeeId: number; data: CreateCertif }) => {
			const formData = new FormData()

			Object.entries(payload.data).forEach(([key, value]) => {
				if (key === 'certif_file') {
					if (value instanceof File) {
						formData.append(key, value)
					}
				} else if (typeof value == 'number') {
					formData.append(key, String(value))
				} else if (value !== null && typeof value == 'string') {
					formData.append(key, value)
				}
			})

			return await http.post(
				urls.employee +
					`/certification/single/${payload.employeeId}?file_name=sertifikat-`,
				formData,
				{
					headers: {
						'Content-Type': 'multipart/form-data',
					},
				}
			)
		},
		onSuccess: (data) => {
			queryClient.invalidateQueries({ queryKey: [keys.employee] })
			queryClient.invalidateQueries({
				queryKey: [keys.expireCertification],
			})
			toast.success(data.data.message)
		},
	})
}
export const useUpdateCertif = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async (payload: {
			id: number
			data: CreateCertif
		}): Promise<AxiosResponse<IApi<{ employeeId: number }>>> => {
			const formData = new FormData()

			Object.entries(payload.data).forEach(([key, value]) => {
				if (key === 'certif_file') {
					if (value instanceof File) {
						formData.append(key, value)
					}
				} else if (typeof value == 'number') {
					formData.append(key, String(value))
				} else if (value !== null && typeof value == 'string') {
					formData.append(key, value)
				}
			})

			return await http.patch(
				urls.employee + `/certification/${payload.id}?file_name=sertifikat-`,
				formData,
				{
					headers: {
						'Content-Type': 'multipart/form-data',
					},
				}
			)
		},
		onSuccess: (data) => {
			queryClient.invalidateQueries({
				queryKey: [keys.employee, data.data.data?.employeeId],
			})
			queryClient.invalidateQueries({
				queryKey: [keys.expireCertification],
			})
			toast.success(data.data.message)
		},
	})
}
export const useDeleteCertif = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async (payload: {
			id: number
		}): Promise<AxiosResponse<IApi<{ employeeId: number }>>> => {
			return await http.delete(urls.employee + `/certification/${payload.id}`)
		},
		onSuccess: (data) => {
			queryClient.invalidateQueries({
				queryKey: [keys.employee, data.data.data?.employeeId],
			})
			queryClient.invalidateQueries({
				queryKey: [keys.expireCertification],
			})
			toast.success(data.data.message)
		},
	})
}

import { useQuery } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'

import { ExpireCertif, ExpireSafety, IApi } from '@/utils/types/api'
import { keys } from '@/shared/utils/constant/_keys'
import { urls } from '@/shared/utils/constant/_urls'
import http from '@/shared/utils/http'

export const useExpireCertification = (params?: { positionId?: string }) => {
	return useQuery({
		queryKey: [keys.expireCertification],
		queryFn: async (): Promise<AxiosResponse<IApi<ExpireCertif[]>>> => {
			return await http(`${urls.employee}/expiring/certification`, {
				params: {
					...(params?.positionId !== ''
						? { positionId: params?.positionId }
						: undefined),
				},
			})
		},
	})
}

export const useExpireSafety = (params?: { positionId?: string }) => {
	return useQuery({
		queryKey: [keys.expireSafety],
		queryFn: async (): Promise<AxiosResponse<IApi<ExpireSafety[]>>> => {
			return await http(`${urls.employee}/expiring/safety`, {
				params: {
					...(params?.positionId !== ''
						? { positionId: params?.positionId }
						: undefined),
				},
			})
		},
	})
}

import { useQuery } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'

import { IApi } from '@/utils/types/api'
import { keys } from '@/shared/utils/constant/_keys'
import { urls } from '@/shared/utils/constant/_urls'
import http from '@/shared/utils/http'

import { Role } from '../type'

export const useDetailRole = ({
	id,
	enabled,
}: {
	id?: string | null
	enabled: boolean
}) => {
	return useQuery({
		queryKey: [keys.rolesDetail, id],
		queryFn: async (): Promise<AxiosResponse<IApi<Role>>> => {
			return await http(`${urls.role}/${id}`)
		},
		enabled,
	})
}

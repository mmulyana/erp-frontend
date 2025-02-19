import { useQuery } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'

import { IApi, Role } from '@/utils/types/api'
import { KEYS } from '@/utils/constant/_keys'
import { URLS } from '@/utils/constant/_urls'
import http from '@/utils/http'

export const useDetailRole = ({
	id,
	enabled,
}: {
	id?: string | null
	enabled: boolean
}) => {
	return useQuery({
		queryKey: [KEYS.ROLES_DETAIL, id],
		queryFn: async (): Promise<AxiosResponse<IApi<Role>>> => {
			return await http(`${URLS.ROLE}/${id}`)
		},
		enabled,
	})
}

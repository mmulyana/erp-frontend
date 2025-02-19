import { useQuery } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'

import { IApi, User } from '@/utils/types/api'
import { KEYS } from '@/utils/constant/_keys'
import { URLS } from '@/utils/constant/_urls'
import http from '@/utils/http'

export const useUser = ({ id }: { id?: string | null }) => {
	return useQuery({
		queryKey: [KEYS.USER_DETAIL, id],
		queryFn: async (): Promise<AxiosResponse<IApi<User>>> => {
			return await http(`${URLS.USER}/${id}`)
		},
		enabled: id !== '' && id !== undefined && id !== null,
	})
}

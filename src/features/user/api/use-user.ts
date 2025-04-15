import { useQuery } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'

import { IApi, User } from '@/utils/types/api'
import { keys } from '@/shared/utils/constant/_keys'
import { urls } from '@/shared/utils/constant/_urls'
import http from '@/shared/utils/http'

export const useUser = ({ id }: { id?: string | null }) => {
	return useQuery({
		queryKey: [keys.userDetail, id],
		queryFn: async (): Promise<AxiosResponse<IApi<User>>> => {
			return await http(`${urls.user}/${id}`)
		},
		enabled: id !== '' && id !== undefined && id !== null,
	})
}

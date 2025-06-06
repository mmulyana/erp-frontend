import { useQuery } from '@tanstack/react-query'

import { IApi } from '@/shared/types'

import { keys } from '@/shared/constants/keys'
import { urls } from '@/shared/constants/urls'
import { Overtime } from '@/shared/types/api'
import http from '@/shared/utils/http'

export const useOvertime = ({ id }: { id?: string }) => {
	return useQuery({
		queryKey: [keys.overtimeDetail, id],
		queryFn: async (): Promise<IApi<Overtime>> => {
			const { data } = await http(`${urls.overtime}/${id}`)
			return data
		},
		enabled: id !== undefined && id !== null && id !== '',
	})
}

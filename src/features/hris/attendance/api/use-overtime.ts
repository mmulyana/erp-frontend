import { useQuery } from '@tanstack/react-query'

import { IApi } from '@/shared/types'

import { keys } from '@/shared/constants/keys'
import { urls } from '@/shared/constants/urls'
import http from '@/shared/utils/http'

import { OvertimeDetail } from '../types'

export const useOvertime = ({ id }: { id?: string }) => {
	return useQuery({
		queryKey: [keys.overtimeDetail, id],
		queryFn: async (): Promise<IApi<OvertimeDetail>> => {
			const { data } = await http(`${urls.overtime}/${id}`)
			return data
		},
		enabled: id !== undefined && id !== null && id !== '',
	})
}

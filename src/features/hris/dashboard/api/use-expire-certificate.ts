import { useQuery } from '@tanstack/react-query'
import { keys } from '@/shared/constants/keys'
import { urls } from '@/shared/constants/urls'
import http from '@/shared/utils/http'
import { IApi } from '@/shared/types'
import { Certificate } from '../../employee/types'

type Params = {
	day: number
}

export const useExpireCertificate = (params?: Params) => {
	return useQuery({
		queryKey: [keys.hrisDashboardExpireCertif, params],
		queryFn: async (): Promise<
			IApi<
				(Certificate & {
					expireUntil: number
				})[]
			>
		> => {
			const { data } = await http(`${urls.dashboardHris}/expire/certificate`, {
				params,
			})
			return data.data
		},
	})
}

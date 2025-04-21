import { useQuery } from '@tanstack/react-query'
import { keys } from '@/shared/constants/keys'
import { urls } from '@/shared/constants/urls'
import http from '@/shared/utils/http'

type Params = {
	day: number
}
export const useExpireSafetyInduction = (params?: Params) => {
	return useQuery({
		queryKey: [keys.hrisDashboardExpireSafetyInduction, params],
		queryFn: async (): Promise<any> => {
			const { data } = await http(
				`${urls.dashboardHris}/expire/safety-induction`,
				{
					params,
				}
			)
			return data.data
		},
	})
}

import { useQuery } from '@tanstack/react-query'
import { keys } from '@/shared/constants/keys'
import { urls } from '@/shared/constants/urls'
import { IApi } from '@/shared/types'
import http from '@/shared/utils/http'

export const useTotalEmployee = () => {
	return useQuery({
		queryKey: [keys.hrisDashboardTotal],
		queryFn: async (): Promise<
			IApi<{ all: number; active: number; nonactive: number }>
		> => {
			const { data } = await http(`${urls.dashboardHris}/total`)
			return data.data
		},
	})
}

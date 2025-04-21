import { useQuery } from '@tanstack/react-query'
import { keys } from '@/shared/constants/keys'
import { urls } from '@/shared/constants/urls'
import http from '@/shared/utils/http'

export const useEmployeePosition = () => {
    return useQuery({
        queryKey: [keys.hrisDashboardEmployeePosition],
        queryFn: async (): Promise<any> => {
            const { data } = await http(`${urls.dashboardHris}/data/position`)
            return data.data
        },
    })
}

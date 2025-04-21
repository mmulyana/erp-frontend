import { useQuery } from '@tanstack/react-query'
import { keys } from '@/shared/constants/keys'
import { urls } from '@/shared/constants/urls'
import http from '@/shared/utils/http'

export const useEmployeeEducation = () => {
    return useQuery({
        queryKey: [keys.hrisDashboardEmployeeEducation],
        queryFn: async (): Promise<any> => {
            const { data } = await http(`${urls.dashboardHris}/data/last-education`)
            return data.data
        },
    })
}

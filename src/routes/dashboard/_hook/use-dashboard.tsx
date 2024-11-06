import { useQuery } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'

import { DashboardTotal, IApi } from '@/utils/types/api'
import { KEYS } from '@/utils/constant/_keys'
import { URLS } from '@/utils/constant/_urls'
import http from '@/utils/http'

export const useDashboardTotal = () => {
  return useQuery({
    queryKey: [KEYS.ACCOUNT],
    queryFn: async (): Promise<AxiosResponse<IApi<DashboardTotal>>> => {
      return await http(URLS.DASHBOARD + '/total')
    },
  })
}

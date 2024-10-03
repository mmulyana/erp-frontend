import { KEYS } from '@/utils/constant/_keys'
import { URLS } from '@/utils/constant/_urls'
import http from '@/utils/http'
import { useQuery } from '@tanstack/react-query'

type Params = {
  id?: string
  search?: string
  labelId?: number
  clientId?: number
}
export const useProject = (params?: Params) => {
  return useQuery({
    queryKey: [KEYS.PROJECT, params],
    queryFn: async () => {
      return await http.request({
        method: 'GET',
        url: URLS.PROJECT,
        params,
      })
    },
  })
}

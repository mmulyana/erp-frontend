import { KEYS } from '@/utils/constant/_keys'
import { URLS } from '@/utils/constant/_urls'
import http from '@/utils/http'
import { Pagination } from '@/utils/types/common'
import { useQuery } from '@tanstack/react-query'

type Params = Pagination & {}
export const useMeasurement = (params: Params) => {
  return useQuery({
    queryFn: async () => {
      return await http(URLS.INVENTORY_MEASUREMENT)
    },
    queryKey: [KEYS.MEASUREMENT, params],
  })
}

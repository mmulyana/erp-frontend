import { KEYS } from '@/utils/constant/_keys'
import { URLS } from '@/utils/constant/_urls'
import http from '@/utils/http'
import { Pagination } from '@/utils/types/common'
import { useQuery } from '@tanstack/react-query'

type brandParams = Pagination & {}
export const useBrand = (params: brandParams) => {
  return useQuery({
    queryFn: async () => {
      return await http(URLS.INVENTORY_BRAND)
    },
    queryKey: [KEYS.BRAND, params],
  })
}

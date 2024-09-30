import { KEYS } from '@/utils/constant/_keys'
import { URLS } from '@/utils/constant/_urls'
import { Pagination } from '@/utils/types/common'
import { useQuery } from '@tanstack/react-query'
import http from '@/utils/http'

type Params = Pagination & {}
export const useTag = (params: Params) => {
  return useQuery({
    queryFn: async () => {
      return await http(URLS.INVENTORY_SUPPLIER_TAG)
    },
    queryKey: [KEYS.TAG, params],
  })
}
